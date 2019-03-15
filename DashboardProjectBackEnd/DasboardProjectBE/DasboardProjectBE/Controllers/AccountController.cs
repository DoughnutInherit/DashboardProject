using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using DasboardProjectBE.ServiceLibrary.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace DasboardProjectBE.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<object> Login([FromHeader] string email, [FromHeader] string password)
        {
            Microsoft.AspNetCore.Identity.SignInResult result;

            if (email != null && password != null || email != String.Empty && password != String.Empty)
            {
                result  = await signInManager.PasswordSignInAsync(email, password, false, false);
            }
            else throw new ApplicationException("User name and Password can't be null or empty");

            if (result.Succeeded)
            {
                var appUser = userManager.Users.SingleOrDefault(r => r.UserName == email);
                return await GenerateJwtToken(email, appUser);
            }

            throw new ApplicationException("Invalid login attempt");
        }

        [HttpPost("register")]
        public async Task<object> Register([FromHeader] string email, [FromHeader] string password)
        {
            IdentityResult result = null;
            ApplicationUser appUser;
            Regex rx = new Regex("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{8,}$");

            if (!string.IsNullOrWhiteSpace(email) || !string.IsNullOrWhiteSpace(password) )
            {
                if (rx.IsMatch(password))
                {
                    appUser = new ApplicationUser()
                    {
                        UserName = email,
                        Email = email,
                        Password = password
                    };
                    try
                    {
                        result = await userManager.CreateAsync(appUser, appUser.Password);
                    }
                    catch (SqlException)
                    {
                        return BadRequest();
                    }
                }
                else return BadRequest();
            }
            else throw new ApplicationException("User name and Password can't be null or empty");

            if (result.Succeeded)
            {
                await signInManager.SignInAsync(appUser, false);
                return await GenerateJwtToken(appUser.UserName, appUser);
            }
            else return BadRequest(result);
        }

        private async Task<object> GenerateJwtToken(string userName, ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Tokens:JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(Convert.ToDouble(configuration["Tokens:JwtExpireTime"]));

            var token = new JwtSecurityToken(
                configuration["Tokens:JwtIssuer"],
                configuration["Tokens:JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return await Task.Run( () => new JwtSecurityTokenHandler().WriteToken(token) );
        }
    }
}
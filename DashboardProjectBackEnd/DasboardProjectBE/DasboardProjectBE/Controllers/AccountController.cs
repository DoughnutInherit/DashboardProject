using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DasboardProjectBE.ServiceLibrary.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DasboardProjectBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        readonly UserManager<ApplicationUser> userManager;

    }
}
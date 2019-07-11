using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ViewModels;
using DasboardProjectBE.ViewModels.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Text;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Net;
using DasboardProjectBE.Configurations;
using Microsoft.Extensions.Configuration;

namespace DasboardProjectBE.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class BirthdayController : ControllerBase
  {
    static string resultNames = "";
    private IConfiguration configuration;
    private readonly IBirthdayService birthdayService;

    public BirthdayController(IConfiguration iConfig, IBirthdayService birthday)
    {
      configuration = iConfig;
      birthdayService = birthday;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
        => Ok((birthdayService.GetAllDaily()).Select(x => x.ToViewModel()));
  }
}

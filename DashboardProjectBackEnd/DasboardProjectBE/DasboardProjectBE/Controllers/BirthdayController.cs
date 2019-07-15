using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ViewModels.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace DasboardProjectBE.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class BirthdayController : ControllerBase
  {
    private readonly IBirthdayService birthdayService;

    public BirthdayController(IBirthdayService birthday)
    {
      birthdayService = birthday;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
        => Ok((birthdayService.GetAllDaily()).Select(x => x.ToViewModel()));
  }
}

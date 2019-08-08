using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ViewModels;
using DasboardProjectBE.ViewModels.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class EventController : ControllerBase
  {
    private readonly IEventService eventService;

    public EventController(IEventService eventService)
    {
      this.eventService = eventService ?? throw new ArgumentNullException(nameof(eventService));
    }

    [HttpGet("{date}")]
    public async Task<IActionResult> Get(DateTime date)
        => Ok((await eventService.GetAllAsync(date)).Select(x => x.ToViewModel()));


    [HttpGet("id={id}")]
    public async Task<IActionResult> GetById(int id)
    {
      var result = (await eventService.GetByIdAsync(id)).ToViewModel();
      if (result != null)
      {
        return Ok(result);
      }
      return BadRequest();
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody]EventViewModel value)
    {
      EventViewModel result = null;
      bool isAllDayEvent = value.EntryDate.Hour == 8 && value.EntryDate.Minute == 0 && value.DepartureDate.Hour == 20 && value.DepartureDate.Minute == 0;
      if (ModelState.IsValid)
      {
        var exist = false;
        var events = await eventService.GetAllDayEventsAsync(value.EntryDate);
        if (events.Count() == 0 || events.Count() > 0 && !isAllDayEvent)
        {
          result = (await eventService.AddAsync(value.ToDto())).ToViewModel();
          return Created("{id}", result);
        }
      }
      return BadRequest();

    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody]EventViewModel value)
    {
      EventViewModel result = null;
      if (ModelState.IsValid)
      {
        result = (await eventService.UpdateAsync(value.ToDto())).ToViewModel();
      }

      return Accepted(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
        => Ok(await eventService.DeleteAsync(id));
  }
}

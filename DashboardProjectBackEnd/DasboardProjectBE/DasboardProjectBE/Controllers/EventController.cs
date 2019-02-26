using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ViewModels;
using DasboardProjectBE.ViewModels.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.Controllers
{
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
        

        [HttpGet("{id}")]
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
            if (ModelState.IsValid)
            {
                var exist = false;
                var events = await eventService.GetAllAsync();
                events.ToList().ForEach(element =>
                {
                    if (element.EntryDate == value.EntryDate)
                    {
                        exist = true;
                    }
                });
                if (!exist)
                {
                    result = (await eventService.AddAsync(value.ToDto())).ToViewModel();
                    return Created("{id}", result);
                }
            }
            return BadRequest();
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]EventViewModel value)
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
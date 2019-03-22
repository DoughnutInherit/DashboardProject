using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ViewModels;
using DasboardProjectBE.ViewModels.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BirthdayController : ControllerBase
    {
        private readonly IBirthdayService birthdayService;

        public BirthdayController(IBirthdayService birthdayService)
        {
            this.birthdayService = birthdayService ?? throw new ArgumentNullException(nameof(IBirthdayService));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
            => Ok((await birthdayService.GetAllAsync()).Select(x => x.ToViewModel()));


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = (await birthdayService.GetByIdAsync(id)).ToViewModel();
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]IEnumerable<BirthdayViewModel> values)
        {
            IEnumerable<BirthdayViewModel> result = null;
            if (ModelState.IsValid)
            {
                result = (await birthdayService.AddAllAsync(values.Select(y => y.ToDto()))).Select(y => y.ToViewModel());
            }

            return Created("{id}", result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]BirthdayViewModel value)
        {
            BirthdayViewModel result = null;
            if (ModelState.IsValid)
            {
                result = (await birthdayService.UpdateAsync(value.ToDto())).ToViewModel();
            }

            return Accepted(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
            => Ok(await birthdayService.DeleteAsync(id));

    }
}
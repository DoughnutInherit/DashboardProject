using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ServiceLibrary.Common.Dto;
using DasboardProjectBE.ServiceLibrary.Common.Dto.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DasboardProjectBE.ServiceLibrary.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            this.eventRepository= eventRepository ?? throw new ArgumentNullException(nameof(eventRepository));
        }

        public async Task<EventDto> AddAsync(EventDto dto)
            => (await eventRepository.AddAsync(dto.ToEntity())).ToDto();

        public async Task<IEnumerable<EventDto>> GetAllAsync()
            => (await eventRepository.GetAllAsync()).Select(x => x.ToDto()).ToList();

        public async Task<EventDto> GetByIdAsync(int id)
            => (await eventRepository.FindByIdAsync(id)).ToDto();

        public async Task<EventDto> UpdateAsync(EventDto dto)
            => ( await eventRepository.UpdateAsync(dto.ToEntity())).ToDto();

        public async Task<bool> DeleteAsync(int id)
            => (await eventRepository.DeleteAsync(id));
    }
}

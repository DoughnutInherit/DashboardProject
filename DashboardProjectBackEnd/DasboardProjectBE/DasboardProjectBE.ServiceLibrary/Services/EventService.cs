using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ServiceLibrary.Common.Dto;
using DasboardProjectBE.ServiceLibrary.Common.Dto.Extensions;
using DasboardProjectBE.ServiceLibrary.Entities;
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
            this.eventRepository = eventRepository ?? throw new ArgumentNullException(nameof(eventRepository));
        }

        public async Task<EventDto> AddAsync(EventDto dto)
        {
            var result = (await eventRepository.AddAsync(dto.ToEntity())).ToDto();
            await eventRepository.SaveChangesAsync();
            return result;
        }

        public async Task<IEnumerable<EventDto>> GetAllAsync()
            => (await eventRepository.GetAllAsync()).Select(x => x.ToDto()).ToList();

        public async Task<EventDto> GetByIdAsync(int id)
            => (await eventRepository.GetByIdAsync(id)).ToDto();

        public async Task<EventDto> UpdateAsync(EventDto eventDto)
        {
            var originalEvent = await UpdateOriginalSpeakerAsync(eventDto);
            var updatedSpeaker = await eventRepository.UpdateAsync(originalEvent);
            var count = await eventRepository.SaveChangesAsync();

            return updatedSpeaker.ToDto();
        }

        private async Task<EventEntity> UpdateOriginalSpeakerAsync(EventDto eventDto)
        {
            EventEntity originalEvent = await eventRepository.GetByIdAsync(eventDto.Id);
            originalEvent.Description = eventDto.Description;
            originalEvent.EntryDate = eventDto.EntryDate;
            originalEvent.DepartureDate = eventDto.DepartureDate;
            originalEvent.TypeId = eventDto.TypeId;

            return originalEvent;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await eventRepository.GetByIdAsync(id);
            if (entity != null)
            {
                await eventRepository.DeleteAsync(entity);
                var count = await eventRepository.SaveChangesAsync();
                if (count == 1)
                {
                    entity = await eventRepository.GetByIdAsync(id);
                }
            }
            return entity == null;
        }
    }
}

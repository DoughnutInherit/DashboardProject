using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories;
using DasboardProjectBE.ServiceLibrary.Common.Dto;
using DasboardProjectBE.ServiceLibrary.Common.Dto.Extensions;
using DasboardProjectBE.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.ServiceLibrary.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository eventRepository;
		private readonly ITypeRepository typeRepository;


        public EventService(IEventRepository eventRepository, ITypeRepository typeRepository)
        {
            this.eventRepository = eventRepository ?? throw new ArgumentNullException(nameof(eventRepository));
            this.typeRepository = typeRepository ?? throw new ArgumentNullException(nameof(typeRepository));
        }

        public async Task<EventDto> AddAsync(EventDto dto)
        {
			var entity = dto.ToEntity();
			var typeEntity = await  typeRepository.GetByIdAsync(dto.TypeId);
			entity.Type = typeEntity;
			var addedEntity = await eventRepository.AddAsync(entity);
            await eventRepository.SaveChangesAsync();			
			var result = addedEntity.ToDto();
            return result;
        }
        public async Task<IEnumerable<EventDto>> GetAllAsync()
            => (await eventRepository.GetAllAsync()).Select(x => x.ToDto()).ToList();

        public async Task<IEnumerable<EventDto>> GetAllAsync(DateTime dateTime)
            => (await eventRepository.GetAllAsync(x => x.EntryDate.Day == dateTime.Day
                            && x.EntryDate.Month == dateTime.Month && x.EntryDate.Year == dateTime.Year)).Select(x => x.ToDto());

        public async Task<IEnumerable<EventDto>> GetAllDayEventsAsync(DateTime date)
        => (await eventRepository.GetAllAsync(x => x.EntryDate.Day == date.Day
                            && x.EntryDate.Month == date.Month && x.EntryDate.Year == date.Year &&
                            x.EntryDate.Hour == 8 && x.EntryDate.Minute == 0 && x.DepartureDate.Hour == 20 && x.DepartureDate.Minute == 0)).Select(x => x.ToDto());

        public async Task<EventDto> GetByIdAsync(int id)
            => (await eventRepository.GetByIdAsync(id)).ToDto();

        public async Task<EventDto> UpdateAsync(EventDto eventDto)
        {
            var originalEvent = await UpdateOriginalEventAsync(eventDto);
            var updatedSpeaker = await eventRepository.UpdateAsync(originalEvent);
            var count = await eventRepository.SaveChangesAsync();

            return updatedSpeaker.ToDto();
        }

        private async Task<EventEntity> UpdateOriginalEventAsync(EventDto eventDto)
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

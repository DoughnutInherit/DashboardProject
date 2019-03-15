using DasboardProjectBE.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.ServiceLibrary.Common.Dto.Extensions
{
    public static class EventDtoExtensions
    {
        public static EventDto ToDto(this EventEntity self) => new EventDto
        {
            Id = self.Id,
            Description = self.Description,
            EntryDate = self.EntryDate,
            DepartureDate = self.DepartureDate,
            TypeId = self.TypeId
        };

        public static EventEntity ToEntity(this EventDto self) => new EventEntity
        {
            Id = self.Id,
            Description = self.Description,
            EntryDate = self.EntryDate,
            DepartureDate = self.DepartureDate,
            TypeId = self.TypeId
        };
    }
}

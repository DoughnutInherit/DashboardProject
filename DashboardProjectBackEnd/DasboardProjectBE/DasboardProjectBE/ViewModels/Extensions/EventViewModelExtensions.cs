using DasboardProjectBE.ServiceLibrary.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.ViewModels.Extensions
{
    public static class EventViewModelExtensions
    {
        public static EventViewModel ToViewModel(this EventDto self) => new EventViewModel
        {
            Id = self.Id,
            Description = self.Description,
            EntryDate = self.EntryDate,
            DepartureDate = self.DepartureDate,
            TypeId = self.TypeId,
        };

        public static EventDto ToDto(this EventViewModel self) => new EventDto
        {
            Id = self.Id,
            Description = self.Description,
            EntryDate = self.EntryDate,
            DepartureDate = self.DepartureDate,
            TypeId = self.TypeId,
        };
    }
}

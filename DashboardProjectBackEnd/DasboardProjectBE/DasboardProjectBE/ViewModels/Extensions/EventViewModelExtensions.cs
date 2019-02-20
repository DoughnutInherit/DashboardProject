using DasboardProjectBE.ServiceLibrary.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.ViewModels.Extensions
{
    public static class EventViewModelExtensions
    {
        public static EventViewModel ToViewModel(this EventDto self)
        {
            return new EventViewModel
            {
                Id = self.Id,
                Description = self.Description,
                EntryDate = self.EntryDate,
                DepartureDate = self.DepartureDate,
                Type = self.Type.ToViewModel()
            };
        }

        public static EventDto ToDto(this EventViewModel self)
        {
            return new EventDto
            {
                Id = self.Id,
                Description = self.Description,
                EntryDate = self.EntryDate,
                DepartureDate = self.DepartureDate,
                Type = self.Type.ToDto(),
            };
        }
    }
}

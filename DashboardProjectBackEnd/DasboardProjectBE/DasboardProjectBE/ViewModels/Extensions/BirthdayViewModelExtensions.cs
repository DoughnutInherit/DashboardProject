using DasboardProjectBE.ServiceLibrary.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.ViewModels.Extensions
{
    public static class BirthdayViewModelExtensions
    {
        public static BirthdayViewModel ToViewModel(this BirthdayDto self)
        {
            return new BirthdayViewModel
            {
                Id = self.Id,
                CompleteName = self.CompleteName,
                Day = self.Day
            };
        }

        public static BirthdayDto ToDto(this BirthdayViewModel self)
        {
            return new BirthdayDto
            {
                Id = self.Id,
                CompleteName = self.CompleteName,
                Day = self.Day
            };
        }
    }
}

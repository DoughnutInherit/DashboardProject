using DasboardProjectBE.ServiceLibrary.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.ViewModels.Extensions
{
    public static class BirthdayViewModelExtensions
    {
        public static BirthdayViewModel ToViewModel(this BirthdayDto self) => new BirthdayViewModel
        {
            Id = self.Id,
            CompleteName = self.CompleteName,
            Day = self.Day,
            ImageUrl = self.ImageUrl
        };

        public static BirthdayDto ToDto(this BirthdayViewModel self) => new BirthdayDto
        {
            Id = self.Id,
            CompleteName = self.CompleteName,
            Day = self.Day,
            ImageUrl = self.ImageUrl
        };
    }
}

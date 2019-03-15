using DasboardProjectBE.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.ServiceLibrary.Common.Dto.Extensions
{
    public static class BirthdayDtoExtensions
    {
        public static BirthdayDto ToDto(this BirthdayEntity self) => new BirthdayDto
        {
            Id = self.Id,
            CompleteName = self.CompleteName,
            Day = self.Day,
            ImageUrl = self.ImageUrl
        };

        public static BirthdayEntity ToEntity(this BirthdayDto self) => new BirthdayEntity
        {
            Id = self.Id,
            CompleteName = self.CompleteName,
            Day = self.Day,
            ImageUrl = self.ImageUrl
        };
    }
}

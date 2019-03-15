using DasboardProjectBE.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DasboardProjectBE.ServiceLibrary.Common.Dto.Extensions
{
    public static class TypeDtoExtensions
    {
        public static TypeDto ToDto(this TypeEntity self) => new TypeDto
        {
            Id = self.Id,
            Name = self.Name,
            //Events = self.Events?.Select(x => x.ToDto()).ToList()
        };

        public static TypeEntity ToEntity(this TypeDto self) => new TypeEntity
        {
            Id = self.Id,
            Name = self.Name,
            //Events = self.Events?.Select(x => x.ToEntity()).ToList()
        };
    }
}

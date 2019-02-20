using DasboardProjectBE.ServiceLibrary.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.ViewModels.Extensions
{
    public static class TypeViewModelExtensions
    {
        public static TypeViewModel ToViewModel(this TypeDto self)
        {
            return new TypeViewModel
            {
                Id = self.Id,
                Name = self.Name,
                Events = self.Events?.Select(x => x.ToViewModel()).ToList()
            };
        }

        public static TypeDto ToDto(this TypeViewModel self)
        {
            return new TypeDto
            {
                Id = self.Id,
                Name = self.Name,
                Events = self.Events?.Select(x => x.ToDto()).ToList()
            };
        }
    }
}

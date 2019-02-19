using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.ServiceLibrary.Common.Dto
{
    public class TypeDto : DtoBase<int>
    {
        public string Name { get; set; }
        public List<EventDto> Events { get; set; }
    }
}

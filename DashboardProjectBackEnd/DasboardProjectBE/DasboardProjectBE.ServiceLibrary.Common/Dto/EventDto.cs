using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.ServiceLibrary.Common.Dto
{
    public class EventDto : DtoBase<int>
    {
        public string Description { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime DepartureDate { get; set; }
        public TypeDto Type { get; set; }
    }
}

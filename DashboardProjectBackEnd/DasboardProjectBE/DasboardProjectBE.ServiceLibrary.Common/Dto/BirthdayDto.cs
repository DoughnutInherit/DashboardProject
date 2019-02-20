using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.ServiceLibrary.Common.Dto
{
    public class BirthdayDto : DtoBase<int>
    {
        public string CompleteName { get; set; }
        public DateTime Day { get; set; }
    }
}

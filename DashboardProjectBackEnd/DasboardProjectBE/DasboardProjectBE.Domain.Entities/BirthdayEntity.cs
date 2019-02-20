using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.ServiceLibrary.Entities
{
    public class BirthdayEntity : EntityBase<int>
    {
        public string CompleteName;
        public DateTime Day { get; set; }
    }
}

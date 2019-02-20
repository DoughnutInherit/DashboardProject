using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.ServiceLibrary.Entities
{
    public class TypeEntity : EntityBase<int>
    {
        public string Name { get; set; }
        public virtual List<EventEntity> Events { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.ViewModels
{
    public class EventViewModel : ViewModelBase<int>
    {
        public string Description { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime DepartureDate { get; set; }
        public TypeViewModel Type { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.ViewModels
{
    public class BirthdayViewModel : ViewModelBase<int>
    {
        public string CompleteName { get; set; }
        public DateTime Day { get; set; }
    }
}

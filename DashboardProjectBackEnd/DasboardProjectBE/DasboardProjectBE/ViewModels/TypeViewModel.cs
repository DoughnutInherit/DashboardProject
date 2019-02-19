using System.Collections.Generic;

namespace DasboardProjectBE.ViewModels
{
    public class TypeViewModel : ViewModelBase<int>
    {
        public string Name { get; set; }
        public List<EventViewModel> Events { get; set; }
    }
}
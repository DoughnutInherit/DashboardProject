using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.ViewModels
{
    public abstract class ViewModelBase<TKey>
    {
        public TKey Id { get; set; }
    }
}

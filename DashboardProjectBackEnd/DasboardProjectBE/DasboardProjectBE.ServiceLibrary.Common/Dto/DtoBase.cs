using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.ServiceLibrary.Common.Dto
{
    public abstract class DtoBase<TKey>
    {
        public TKey Id { get; set; }
    }
}

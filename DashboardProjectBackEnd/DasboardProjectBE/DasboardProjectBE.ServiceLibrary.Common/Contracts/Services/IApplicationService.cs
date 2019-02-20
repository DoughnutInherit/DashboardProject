using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DasboardProjectBE.ServiceLibrary.Common.Contracts.Services
{
    public interface IApplicationService<TModel> where TModel : class
    {
        Task<IEnumerable<TModel>> GetAllAsync();
    }
}

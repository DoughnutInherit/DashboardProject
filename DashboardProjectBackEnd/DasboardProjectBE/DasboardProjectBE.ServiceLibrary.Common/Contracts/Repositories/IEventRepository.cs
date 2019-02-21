using DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories;
using DasboardProjectBE.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DasboardProjectBE.ServiceLibrary.Common.Contracts
{
    public interface IEventRepository : IAsyncRepository<int,EventEntity>
    {
        //Task<IEnumerable<EventEntity>> GetAllAsync(DateTime date);
    }
}

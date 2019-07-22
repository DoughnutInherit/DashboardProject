using DasboardProjectBE.ServiceLibrary.Common.Dto;
using DasboardProjectBE.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories
{
    public interface IBirthdayRepository : IAsyncRepository<int, BirthdayEntity>
    {
        Task<IEnumerable<BirthdayEntity>> AddAllAsync(IEnumerable<BirthdayEntity> entities);
        List<BirthdayEntity> GetAllDaily();
  }
}

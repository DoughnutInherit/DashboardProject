using DasboardProjectBE.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories
{
    public interface IBirthdayRepository : IAsyncRepository<int, BirthdayEntity>
    {
    }
}

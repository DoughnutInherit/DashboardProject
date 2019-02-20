using DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories;
using DasboardProjectBE.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.Data.Repositories
{
    public class BirthdayRepository : BaseRepository<BirthdayEntity, int>, IBirthdayRepository
    {
        public BirthdayRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}

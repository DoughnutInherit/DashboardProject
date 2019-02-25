using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ServiceLibrary.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DasboardProjectBE.Data.Repositories
{
    public class EventRepository : BaseRepository<EventEntity, int>, IEventRepository
    {
        public EventRepository(IUnitOfWork uoW) : base(uoW)
        {
        }
    }
}

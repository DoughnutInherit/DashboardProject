using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ServiceLibrary.Entities;

namespace DasboardProjectBE.Data.Repositories
{
    public class EventRepository : BaseRepository<EventEntity, int>, IEventRepository
    {
        public EventRepository(IUnitOfWork uoW) : base(uoW)
        {
        }
    }
}

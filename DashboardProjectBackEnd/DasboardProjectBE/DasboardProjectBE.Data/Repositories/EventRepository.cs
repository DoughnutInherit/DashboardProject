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
        public List<EventEntity> events = new List<EventEntity> {
            new EventEntity {Id=1, Type = new TypeEntity{Name = "Appointment"},
            Description ="El jueves 20 vendrá a vernos Joan Salines, CEO de LetGo",
            EntryDate = new DateTime(2019,02,20,12,00,00), DepartureDate = new DateTime(2019,02,20,13,00,00)
            },
            new EventEntity {Id=2, Type = new TypeEntity{Name = "Appointment"},
                Description ="El viernes 21 vendrá a vernos Pedro Costa, CEO de Axa",
                EntryDate = new DateTime(2019,02,21,12,00,00), DepartureDate = new DateTime(2019,02,21,13,00,00)
            },
            new EventEntity {Id=3,Type = new TypeEntity{Name = "Appointment"},
                Description ="El lunes 2 vendrá a vernos Pepe",
                EntryDate = new DateTime(2019,03,02,11,00,00), DepartureDate = new DateTime(2019,03,02,12,00,00)
            },
            new EventEntity {Id=4, Type = new TypeEntity{Name = "Appointment"},
                Description ="El miercoles 4 vendrá a vernos Pepe Lopez, CEO de CIRSA",
                EntryDate = new DateTime(2019,03,04,11,00,00), DepartureDate = new DateTime(2019,03,04,12,00,00)
            },
            new EventEntity {Id=1,Type = new TypeEntity{Name = "Fruta"},
            Description ="El jueves 5 vendrá a vernos Marc Zuckerberg, CEO de Facebook",
            EntryDate = new DateTime(2019,03,05,10,00,00), DepartureDate =  new DateTime(2019,03,05,12,00,00)
            },
        };

        public EventRepository(IUnitOfWork uoW) : base(uoW)
        {
        }

        public override async Task<EventEntity> FindByIdAsync(int id)
        => await Task.FromResult(events.DefaultIfEmpty(new EventEntity()).FirstOrDefault(x => x.Id == id));

        public override async Task<IEnumerable<EventEntity>> GetAllAsync()
            => await Task.FromResult(events);
    }
}

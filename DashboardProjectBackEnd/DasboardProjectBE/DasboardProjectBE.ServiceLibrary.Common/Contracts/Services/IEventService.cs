using DasboardProjectBE.ServiceLibrary.Common.Contracts.Services;
using DasboardProjectBE.ServiceLibrary.Common.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DasboardProjectBE.ServiceLibrary.Common.Contracts
{
    public interface IEventService : IApplicationService<EventDto>
    {
        Task<IEnumerable<EventDto>> GetAllAsync(DateTime date);
        Task<EventDto> GetByIdAsync(int id);
        Task<EventDto> AddAsync(EventDto dto);
        Task<EventDto> UpdateAsync(EventDto dto);
        Task<bool> DeleteAsync(int id);
    }
}

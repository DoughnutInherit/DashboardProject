using DasboardProjectBE.ServiceLibrary.Common.Contracts.Services;
using DasboardProjectBE.ServiceLibrary.Common.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DasboardProjectBE.ServiceLibrary.Common.Contracts
{
    public interface IBirthdayService : IApplicationService<BirthdayDto>
    {
        Task<BirthdayDto> GetByIdAsync(int id);
        Task<BirthdayDto> AddAsync(BirthdayDto dto);
        Task<BirthdayDto> UpdateAsync(BirthdayDto dto);
        Task<bool> DeleteAsync(int id);
    }
}

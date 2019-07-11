using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories;
using DasboardProjectBE.ServiceLibrary.Common.Dto;
using DasboardProjectBE.ServiceLibrary.Common.Dto.Extensions;
using DasboardProjectBE.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DasboardProjectBE.ServiceLibrary.Services
{
  public class BirthdayService : IBirthdayService
  {
    private readonly IBirthdayRepository birthdayRepository;

    public BirthdayService(IBirthdayRepository birthdayRepository)
    {
      this.birthdayRepository = birthdayRepository ?? throw new ArgumentNullException(nameof(birthdayRepository));
    }

    public async Task<BirthdayDto> AddAsync(BirthdayDto dto)
    {
      var result = (await birthdayRepository.AddAsync(dto.ToEntity())).ToDto();
      await birthdayRepository.SaveChangesAsync();
      return result;
    }

    public async Task<IEnumerable<BirthdayDto>> AddAllAsync(IEnumerable<BirthdayDto> dtos)
    {
      var result = (await birthdayRepository.AddAllAsync(dtos.Select(x => x.ToEntity()))).Select(x => x.ToDto());
      await birthdayRepository.SaveChangesAsync();
      return result;
    }

    public async Task<IEnumerable<BirthdayDto>> GetAllAsync()
        => (await birthdayRepository.GetAllAsync()).Select(x => x.ToDto()).ToList();

    public async Task<BirthdayDto> GetByIdAsync(int id)
        => (await birthdayRepository.GetByIdAsync(id)).ToDto();

    public async Task<BirthdayDto> UpdateAsync(BirthdayDto dto)
    {
      var originalBirthday = await UpdateOriginalBirthdayAsync(dto);
      var updatedSpeaker = await birthdayRepository.UpdateAsync(originalBirthday);
      var count = await birthdayRepository.SaveChangesAsync();

      return updatedSpeaker.ToDto();
    }

    private async Task<BirthdayEntity> UpdateOriginalBirthdayAsync(BirthdayDto dto)
    {
      BirthdayEntity originalBirthday = await birthdayRepository.GetByIdAsync(dto.Id);
      originalBirthday.CompleteName = dto.CompleteName;
      originalBirthday.Day = dto.Day;
      originalBirthday.ImageUrl = dto.ImageUrl;

      return originalBirthday;
    }

    public async Task<bool> DeleteAsync(int id)
    {
      var entity = await birthdayRepository.GetByIdAsync(id);
      if (entity != null)
      {
        await birthdayRepository.DeleteAsync(entity);
        var count = await birthdayRepository.SaveChangesAsync();
        if (count == 1)
        {
          entity = await birthdayRepository.GetByIdAsync(id);
        }
      }
      return entity == null;
    }

    public List<BirthdayDto> GetAllDaily()
      => birthdayRepository.GetAllDaily().Select(x => x.ToDto()).ToList();
    
  }
}

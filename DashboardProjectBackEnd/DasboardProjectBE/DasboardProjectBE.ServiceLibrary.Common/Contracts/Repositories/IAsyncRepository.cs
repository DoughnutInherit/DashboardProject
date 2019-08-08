using DasboardProjectBE.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories
{
  public interface IAsyncRepository<TKey, TEntity> where TEntity : EntityBase<TKey>
  {
    Task<IEnumerable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> predicate);
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<TEntity> GetByIdAsync(TKey id);
    Task<TEntity> GetByIdWithIncludesAsync(TKey id, IEnumerable<Expression<Func<TEntity, object>>> includes);
    Task<TEntity> AddAsync(TEntity entity);
    Task DeleteAsync(TEntity entity);
    Task<TEntity> UpdateAsync(TEntity entity);
    Task<int> SaveChangesAsync();
  }
}

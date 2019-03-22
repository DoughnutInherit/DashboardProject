using DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories;
using DasboardProjectBE.ServiceLibrary.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DasboardProjectBE.Data.Repositories
{
    public abstract class BaseRepository<TEntity, TKey>
        : IAsyncRepository<TKey, TEntity>
        where TEntity : EntityBase<TKey>
    {
        private DasboardDBContext context;

        protected BaseRepository(IUnitOfWork unitOfWork)
            => context = unitOfWork.Context ?? throw new ArgumentNullException(nameof(context));

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
            => await context.Set<TEntity>().ToListAsync();

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> predicate)
            => await context.Set<TEntity>().Where(predicate).ToListAsync(); 

        public async Task<TEntity> GetByIdWithIncludesAsync(TKey id, IEnumerable<Expression<Func<TEntity, object>>> includes)
            => await includes.Aggregate(context.Set<TEntity>().AsQueryable(), (current, include) => current.Include(include))
                             .SingleOrDefaultAsync(s => s.Id.Equals(id));

        public virtual async Task<int> SaveChangesAsync()
            => await context.SaveChangesAsync();

        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            EntityEntry<TEntity> entityEntry = context.Set<TEntity>().Add(entity);
            TEntity result = entityEntry.Entity;
            return await Task.FromResult(result);
        }
        
        public virtual async Task<IEnumerable<TEntity>> AddAllAsync(IEnumerable<TEntity> entities)
        {
            IEnumerable<EntityEntry<TEntity>> entitiesEntries = entities.Select(x => context.Set<TEntity>().Add(x));
            IEnumerable<TEntity> result = entitiesEntries.Select(x => x.Entity);
            return await Task.FromResult(result);
        }

        public virtual async Task DeleteAsync(TEntity entity)
            => await Task.FromResult(context.Entry(entity).State = EntityState.Deleted);

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
            => await Task.FromResult(context.Update(entity).Entity);

        public async Task<TEntity> GetByIdAsync(TKey id)
            => await context.Set<TEntity>().FindAsync(id);

    }
}


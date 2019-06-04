using DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories;
using DasboardProjectBE.ServiceLibrary.Entities;

namespace DasboardProjectBE.Data.Repositories
{
	public class TypeRepository : BaseRepository<TypeEntity, int>, ITypeRepository
	{
		public TypeRepository(IUnitOfWork uoW) : base(uoW)
		{
		}
	}
}

using DasboardProjectBE.ServiceLibrary.Entities;


namespace DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories
{
	public interface ITypeRepository  : IAsyncRepository<int, TypeEntity>
	{
	}
}

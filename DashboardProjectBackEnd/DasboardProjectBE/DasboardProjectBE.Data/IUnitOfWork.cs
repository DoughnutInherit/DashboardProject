using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ServiceLibrary.Entities;
using Microsoft.EntityFrameworkCore;

namespace DasboardProjectBE.Data.Repositories
{
    public interface IUnitOfWork
    {
        DasboardDBContext Context { get; }
        void Commit();
    }
}
using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.ServiceLibrary.Entities
{
  public class EventEntity : EntityBase<int>
  {
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime DepartureDate { get; set; }
    public int TypeId { get; set; }
    public virtual TypeEntity Type { get; set; }
    public string ClientName { get; set; }
    public string ClientPosition { get; set; }
    public string ClientCompanyName { get; set; }
  }
}

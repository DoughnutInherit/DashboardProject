using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.Hubs
{
  public class EventsHub : Hub
  {
    public void UpdateEvents()
    {
      Clients.All.SendAsync("updateEvents");
    }
  }
}

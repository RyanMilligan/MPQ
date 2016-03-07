using Microsoft.LightSwitch.Security.Server;
using Microsoft.LightSwitch;
using System.Text;
using System.Linq;
using System.Collections.Generic;
using System;

namespace LightSwitchApplication
{
    public partial class ApplicationDataService
    {
        partial void NowReporting_PreprocessQuery(ref IQueryable<PvPInstance> query)
        {
            var now = DateTime.Now - TimeSpan.FromDays(2.5);
            query = (from i in PvPInstances.GetQuery().Execute().AsQueryable()
                     where i.StartTime < now
                     select i);
        }
    }
}
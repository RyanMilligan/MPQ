using Microsoft.LightSwitch;
using System.Text;
using System.Linq;
using System.Collections.Generic;
using System;

namespace LightSwitchApplication
{
    public partial class PvPInstance
    {
        partial void EndTime_Compute(ref DateTime result)
        {
            // Set result to the desired field value
            result = StartTime.AddDays(2.5);
        }

        partial void PvPInstance_Created()
        {

        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MPQSim.Base
{
    public static class Helpers
    {
        public static void AddRange<T>(this IList<T> list, IEnumerable<T> items)
        {
            foreach (var i in items)
            {
                list.Add(i);
            }
        }
    }
}

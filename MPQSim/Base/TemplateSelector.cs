using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace MPQSim.Base
{
    public class TemplateSelector : DataTemplateSelector
    {
        public TemplateSelector()
        {
            Templates = new ResourceDictionary();
        }

        public ResourceDictionary Templates { get; set; }

        public override DataTemplate SelectTemplate(object item, DependencyObject container)
        {
            var type = item.GetType();
            while (type != null)
            {
                var template = Templates[type.Name] as DataTemplate;
                if (template != null)
                {
                    return template;
                }

                type = type.BaseType;
            }
            foreach (var iface in item.GetType().GetInterfaces())
            {
                var template = Templates[iface.Name] as DataTemplate;
                if (template != null)
                {
                    return template;
                }
            }
            return base.SelectTemplate(item, container);
        }
    }
}

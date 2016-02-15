using MPQSim.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace MPQSim
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            var thing = new Named();
            thing.Name = "foo";
            Console.WriteLine(thing.Name);

            var e = new Event()
            {
                Name = "Deadpool vs. MPQ",
                SubEvents =
                {
                    new SubEvent()
                    {
                        Duration = TimeSpan.FromDays(2),
                        Name = "Deadpool vs. Villains",
                        Nodes =
                        {

                        }
                    }
                }
            };
        }
    }
}

using MPQSim.Base;
using System.Collections.ObjectModel;
using System.IO;
using System.Windows;
using System.Xml.Serialization;

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

            DataContext = new MainWindowContext();
        }

        private class MainWindowContext : Monitorable
        {
            public MainWindowContext()
            {
                var serializer = new XmlSerializer(typeof(Event));
                foreach (var file in Directory.EnumerateFiles("Events", "*.xml"))
                {
                    using (var reader = new StreamReader(file))
                    {
                        var e = (Event)serializer.Deserialize(reader);
                        Events.Add(e);
                    }
                }
            }

            [Lazy]
            public ObservableCollection<Event> Events
            {
                get { return this.Get(t => t.Events, _Events); }
                set { this.Set(t => t.Events, value, _Events); }
            }
            private static readonly IProperty<MainWindowContext> _Events = Properties<MainWindowContext>.Property(t => t.Events);

            public Event SelectedEvent
            {
                get { return this.Get(t => t.SelectedEvent, _SelectedEvent); }
                set { this.Set(t => t.SelectedEvent, value, _SelectedEvent); }
            }
            private static readonly IProperty<MainWindowContext> _SelectedEvent = Properties<MainWindowContext>.Property(t => t.SelectedEvent);
        }
    }
}

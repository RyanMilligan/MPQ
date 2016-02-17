using MPQSim.Base;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Windows;
using System.Xml.Serialization;
using TimelineLibrary;
using System.Linq;
using System;

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

                Strategies.Add(new OptimalStrategy());
            }

            public Command ExecuteStrategy
            {
                get
                {
                    return new Command(() =>
                    {
                        Runs.Add(SelectedStrategy.Execute(SelectedEvent));
                    });
                }
            }

            public ObservableCollection<Schedule> Runs
            {
                get { return this.Get(t => t.Runs, _Runs); }
                set { this.Set(t => t.Runs, value, _Runs); }
            }
            private static readonly IProperty<MainWindowContext> _Runs = Properties<MainWindowContext>.Property(t => t.Runs);


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

            [Lazy]
            public ObservableCollection<Strategy> Strategies
            {
                get { return this.Get(t => t.Strategies, _Strategies); }
                set { this.Set(t => t.Strategies, value, _Strategies); }
            }
            private static readonly IProperty<MainWindowContext> _Strategies = Properties<MainWindowContext>.Property(t => t.Strategies);

            public Strategy SelectedStrategy
            {
                get { return this.Get(t => t.SelectedStrategy, _SelectedStrategy); }
                set { this.Set(t => t.SelectedStrategy, value, _SelectedStrategy); }
            }
            private static readonly IProperty<MainWindowContext> _SelectedStrategy = Properties<MainWindowContext>.Property(t => t.SelectedStrategy);

            public Schedule SelectedRun
            {
                get { return this.Get(t => t.SelectedRun, _SelectedRun); }
                set { this.Set(t => t.SelectedRun, value, _SelectedRun); }
            }
            private static readonly IProperty<MainWindowContext> _SelectedRun = Properties<MainWindowContext>.Property(t => t.SelectedRun);


            public IEnumerable<TimelineBand> TimelineBands
            {
                get
                {
                    if (SelectedStrategy == null)
                    {
                        return null;
                    }
                    return SelectedRun.SubEvents.Select(e => new TimelineBand()
                    {
                        EventStore = new TimelineEventStore((from n in e.Nodes
                                                            from f in n.Fights
                                                            select new TimelineEvent()
                        {
                            StartDate = new DateTime(f.Time.Ticks),
                            EndDate = new DateTime(f.Time.Ticks + n.Node.ApproximateTimeToClear.Ticks),
                            Description = "Cleared node " + f.Node.Name,
                            Title = "Fight"
                        }).ToList(), false)
                    });
                }
            }
        }
    }
}

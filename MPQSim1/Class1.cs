using MPQSim.Base;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace MPQSim
{
    public class Event : Named
    {
        [Lazy]
        [XmlArrayItem]
        public ObservableCollection<SubEvent> SubEvents
        {
            get { return this.Get(t => t.SubEvents, _SubEvents); }
            set { this.Set(t => t.SubEvents, value, _SubEvents); }
        }
        private static readonly IProperty<Event> _SubEvents = Properties<Event>.Property(t => t.SubEvents);

    }

    public class SubEvent : Named
    {
        public TimeSpan Duration
        {
            get { return this.Get(t => t.Duration, _Duration); }
            set { this.Set(t => t.Duration, value, _Duration); }
        }
        private static readonly IProperty<SubEvent> _Duration = Properties<SubEvent>.Property(t => t.Duration);

        [Lazy]
        [XmlArrayItem]
        public ObservableCollection<Node> Nodes
        {
            get { return this.Get(t => t.Nodes, _Nodes); }
            set { this.Set(t => t.Nodes, value, _Nodes); }
        }
        private static readonly IProperty<SubEvent> _Nodes = Properties<SubEvent>.Property(t => t.Nodes);
    }

    public class Node : Named
    {
        public Node()
        {
            ApproximateTimeToClear = TimeSpan.FromMinutes(5);
        }

        [XmlAttribute]
        public int Level
        {
            get { return this.Get(t => t.Level, _Level); }
            set { this.Set(t => t.Level, value, _Level); }
        }
        private static readonly IProperty<Node> _Level = Properties<Node>.Property(t => t.Level);

        [XmlAttribute]
        public double InitialScore
        {
            get { return this.Get(t => t.InitialScore, _InitialScore); }
            set { this.Set(t => t.InitialScore, value, _InitialScore); }
        }
        private static readonly IProperty<Node> _InitialScore = Properties<Node>.Property(t => t.InitialScore);

        public TimeSpan ApproximateTimeToClear
        {
            get { return this.Get(t => t.ApproximateTimeToClear, _ApproximateTimeToClear); }
            set { this.Set(t => t.ApproximateTimeToClear, value, _ApproximateTimeToClear); }
        }
        private static readonly IProperty<Node> _ApproximateTimeToClear = Properties<Node>.Property(t => t.ApproximateTimeToClear);

    }

    public class RuntimeNode : Owned<RuntimeSubEvent>
    {
        public Node Node
        {
            get { return this.Get(t => t.Node, _Node); }
            set { this.Set(t => t.Node, value, _Node); }
        }
        private static readonly IProperty<RuntimeNode> _Node = Properties<RuntimeNode>.Property(t => t.Node);

        public TimeSpan LastFought
        {
            get { return this.Get(t => t.LastFought, _LastFought); }
            set { this.Set(t => t.LastFought, value, _LastFought); }
        }
        private static readonly IProperty<RuntimeNode> _LastFought = Properties<RuntimeNode>.Property(t => t.LastFought);

        public double CurrentScore
        {
            get
            {
                return Node.InitialScore - ((Node.InitialScore / 6.0) * ((Owner.Owner.CurrentTime.Ticks - LastFought.Ticks) / TimeSpan.FromHours(8).Ticks));
            }
        }

        [Lazy]
        public ObservableCollection<Fight> Fights
        {
            get { return this.Get(t => t.Fights, _Fights); }
            set { this.Set(t => t.Fights, value, _Fights); }
        }
        private static readonly IProperty<RuntimeNode> _Fights = Properties<RuntimeNode>.Property(t => t.Fights);

        public Fight Fight()
        {
            var oldScore = CurrentScore;

            var fight = new MPQSim.Fight()
            {
                Node = Node,
                Time = Owner.Owner.CurrentTime,
                Score = oldScore
            };

            Owner.Owner.Advance(Node.ApproximateTimeToClear);

            Fights.Add(fight);

            return fight;
        }
    }

    public class RuntimeSubEvent : Owned<Schedule>
    {
        [AttachTo]
        public SubEvent SubEvent
        {
            get { return this.Get(t => t.SubEvent, _SubEvent); }
            set { this.Set(t => t.SubEvent, value, _SubEvent); }
        }
        private static readonly IProperty<RuntimeSubEvent> _SubEvent = Properties<RuntimeSubEvent>.Property(t => t.SubEvent);

        public void AttachToSubEvent(SubEvent sub)
        {
            Nodes = null;
            Nodes.AddRange(sub.Nodes.Select(n => new RuntimeNode() { Node = n }));
        }

        public Collection<RuntimeNode> Nodes
        {
            get { return this.Get(t => t.Nodes, _Nodes); }
            set { this.Set(t => t.Nodes, value, _Nodes); }
        }
        private static readonly IProperty<RuntimeSubEvent> _Nodes = Properties<RuntimeSubEvent>.Property(t => t.Nodes);

    }

    public class Schedule : Monitorable
    {
        public Strategy Strategy
        {
            get { return this.Get(t => t.Strategy, _Strategy); }
            set { this.Set(t => t.Strategy, value, _Strategy); }
        }
        private static readonly IProperty<Schedule> _Strategy = Properties<Schedule>.Property(t => t.Strategy);


        public TimeSpan CurrentTime
        {
            get { return this.Get(t => t.CurrentTime, _CurrentTime); }
            set { this.Set(t => t.CurrentTime, value, _CurrentTime); }
        }
        private static readonly IProperty<Schedule> _CurrentTime = Properties<Schedule>.Property(t => t.CurrentTime);

        [AttachTo]
        public Event Event
        {
            get { return this.Get(t => t.Event, _Event); }
            set { this.Set(t => t.Event, value, _Event); }
        }
        private static readonly IProperty<Schedule> _Event = Properties<Schedule>.Property(t => t.Event);

        public void AttachToEvent(Event e)
        {
            SubEvents = new ObservableCollection<RuntimeSubEvent>(Event.SubEvents.Select(sub => new RuntimeSubEvent() { SubEvent = sub, Owner = this }));
        }

        [AttachTo]
        public ObservableCollection<RuntimeSubEvent> SubEvents
        {
            get { return this.Get(t => t.SubEvents, _SubEvents); }
            set { this.Set(t => t.SubEvents, value, _SubEvents); }
        }
        private static readonly IProperty<Schedule> _SubEvents = Properties<Schedule>.Property(t => t.SubEvents);

        private void AttachToSubEvents()
        {
            _subEventEnumerator = SubEvents.GetEnumerator();
        }

        private IEnumerator<RuntimeSubEvent> _subEventEnumerator;

        public RuntimeSubEvent CurrentEvent
        {
            get { return this.Get(t => t.CurrentEvent, _CurrentEvent); }
            set { this.Set(t => t.CurrentEvent, value, _CurrentEvent); }
        }
        private static readonly IProperty<Schedule> _CurrentEvent = Properties<Schedule>.Property(t => t.CurrentEvent);

        public bool Advance(TimeSpan interval)
        {
            var percentage = interval.Ticks / TimeSpan.FromHours(8).Ticks;

            if (CurrentEvent == null || CurrentTime >= CurrentEvent.SubEvent.Duration)
            {
                if (_subEventEnumerator.MoveNext())
                {
                    CurrentEvent = _subEventEnumerator.Current;
                    CurrentTime = TimeSpan.Zero;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                CurrentTime += interval;
            }

            return true;
        }

        public int TotalScore
        {
            get { return this.Get(t => t.TotalScore, _TotalScore); }
            set { this.Set(t => t.TotalScore, value, _TotalScore); }
        }
        private static readonly IProperty<Schedule> _TotalScore = Properties<Schedule>.Property(t => t.TotalScore);
    }

    public class Fight : Monitorable
    {
        public Node Node
        {
            get { return this.Get(t => t.Node, _Node); }
            set { this.Set(t => t.Node, value, _Node); }
        }
        private static readonly IProperty<Fight> _Node = Properties<Fight>.Property(t => t.Node);

        public double Score
        {
            get { return this.Get(t => t.Score, _Score); }
            set { this.Set(t => t.Score, value, _Score); }
        }
        private static readonly IProperty<Fight> _Score = Properties<Fight>.Property(t => t.Score);


        public TimeSpan Time
        {
            get { return this.Get(t => t.Time, _Time); }
            set { this.Set(t => t.Time, value, _Time); }
        }
        private static readonly IProperty<Fight> _Time = Properties<Fight>.Property(t => t.Time);

    }

    public abstract class Strategy : Named
    {
        public Strategy()
        {
            Name = GetType().Name;
        }

        public abstract IEnumerable<Fight> GetFights(Schedule e);

        public Schedule Execute(Event selectedEvent)
        {
            var schedule = new Schedule();

            GetFights(schedule).ToArray();

            return schedule;
        }
    }

    public class OptimalStrategy : Strategy
    {
        public override IEnumerable<Fight> GetFights(Schedule e)
        {
            do
            {
                yield break;
            } while (e.Advance(TimeSpan.FromHours(8)) != null);
        }
    }
}

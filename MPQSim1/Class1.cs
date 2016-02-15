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
        [XmlAttribute]
        public int Level
        {
            get { return this.Get(t => t.Level, _Level); }
            set { this.Set(t => t.Level, value, _Level); }
        }
        private static readonly IProperty<Node> _Level = Properties<Node>.Property(t => t.Level);

        [XmlAttribute]
        public int InitialScore
        {
            get { return this.Get(t => t.InitialScore, _InitialScore); }
            set { this.Set(t => t.InitialScore, value, _InitialScore); }
        }
        private static readonly IProperty<Node> _InitialScore = Properties<Node>.Property(t => t.InitialScore);
    }

    public class RuntimeNode : Monitorable
    {
        public TimeSpan LastFought
        {
            get { return this.Get(t => t.LastFought, _LastFought); }
            set { this.Set(t => t.LastFought, value, _LastFought); }
        }
        private static readonly IProperty<RuntimeNode> _LastFought = Properties<RuntimeNode>.Property(t => t.LastFought);

        public int CurrentScore
        {
            get { return this.Get(t => t.CurrentScore, _CurrentScore); }
            set { this.Set(t => t.CurrentScore, value, _CurrentScore); }
        }
        private static readonly IProperty<RuntimeNode> _CurrentScore = Properties<RuntimeNode>.Property(t => t.CurrentScore);
    }

    public class Schedule : Monitorable
    {
        public ObservableCollection<Fight> Fights
        {
            get { return this.Get(t => t.Fights, _Fights); }
            set { this.Set(t => t.Fights, value, _Fights); }
        }
        private static readonly IProperty<Schedule> _Fights = Properties<Schedule>.Property(t => t.Fights);

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

        public TimeSpan Time
        {
            get { return this.Get(t => t.Time, _Time); }
            set { this.Set(t => t.Time, value, _Time); }
        }
        private static readonly IProperty<Fight> _Time = Properties<Fight>.Property(t => t.Time);

    }

    public abstract class Strategy
    {
        public abstract IEnumerable<Fight> GetFights(SubEvent e);
    }

    public class OptimalStrategy : Strategy
    {
        public override IEnumerable<Fight> GetFights(SubEvent e)
        {
            yield break;
        }
    }
}

using MPQSim.Base;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MPQSim
{
    public class Event : Named
    {
        [Lazy]
        public ObservableCollection<SubEvent> SubEvents
        {
            get
            {
                return this.Get(t => t.SubEvents);
            }
            set { this.Set(t => t.SubEvents, value); }
        }
    }

    public class SubEvent : Named
    {
        public TimeSpan Duration
        {
            get
            {
                return this.Get(t => t.Duration);
            }
            set { this.Set(t => t.Duration, value); }
        }


        [Lazy]
        public ObservableCollection<Node> Nodes
        {
            get { return this.Get(t => t.Nodes); }
            set { this.Set(t => t.Nodes, value); }
        }
    }

    public class Node : Named
    {
        public int Level
        {
            get
            {
                return this.Get(t => t.Level);
            }
            set { this.Set(t => t.Level, value); }
        }

        public int InitialScore
        {
            get
            {
                return this.Get(t => t.InitialScore);
            }
            set { this.Set(t => t.InitialScore, value); }
        }
    }

    public class Schedule : Monitorable
    {
        public ObservableCollection<Fight> Matches
        {
            get
            {
                return this.Get(t => t.Matches);
            }
            set { this.Set(t => t.Matches, value); }
        }
    }

    public class Fight : Monitorable
    {
        public Node Node
        {
            get
            {
                return this.Get(t => t.Node);
            }
            set { this.Set(t => t.Node, value); }
        }

        public DateTime Time
        {
            get
            {
                return this.Get(t => t.Time);
            }
            set { this.Set(t => t.Time, value); }
        }
    }

    public abstract class Strategy
    {
        public abstract IEnumerable<Fight> GetFights(SubEvent e);
    }

    public class OptimalStrategy
    {
    }
}

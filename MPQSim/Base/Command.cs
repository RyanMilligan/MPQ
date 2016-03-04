using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MPQSim.Base
{
    public class Command<TParam> : ICommand
    {
        public Command(Action action) : this(_ => action())
        {

        }

        public Command(Action<TParam> action)
        {
            Execute = action;
        }

        public Action<TParam> Execute { get; private set; }
        public Func<object, bool> CanExecute { get; set; }
        public event EventHandler CanExecuteChanged;

        bool ICommand.CanExecute(object parameter)
        {
            if (CanExecute != null)
            {
                return CanExecute(parameter);
            }
            return true;
        }

        void ICommand.Execute(object parameter)
        {
            Execute((TParam)parameter);
        }
    }

    public class Command : Command<object>
    {
        public Command(Action action) : base(action)
        {

        }
    }
}

using MPQSim.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MPQSim.Base
{
    public interface INamed
    {
        string Name { get; set; }
    }

    public class BetterPropertyChangedEventArgs<TOwner, TProperty> : PropertyChangedEventArgs
        where TOwner : IPropertyChangeable
    {
        public BetterPropertyChangedEventArgs(Property<TOwner, TProperty> property, TProperty oldValue, TProperty newValue) : base(property.Name)
        {
            OldValue = oldValue;
            NewValue = newValue;
        }

        public TProperty OldValue { get; set; }
        public TProperty NewValue { get; set; }
    }

    public interface IPropertyStorage
    {
        TProperty Get<TProperty>(int index);

        void Set<TProperty>(TProperty newValue, int index);
    }

    public interface IPropertyChangeable
    {
        IPropertyStorage Storage { get; set; }
    }

    public interface IProperty<TOwner>
        where TOwner : IPropertyChangeable
    {

    }

    public class Property<TOwner, TProperty> : IProperty<TOwner>
        where TOwner : IPropertyChangeable
    {
        public Property(IPropertyStorageDefinition storage, Expression<Func<TOwner, TProperty>> property, Expression<Func<TOwner, TProperty>> get = null,
            Expression<Action<TOwner, TProperty>> set = null)
        {
            var body = property.Body as MemberExpression;

            PropertyInfo = (PropertyInfo)body.Member;
            Name = body.Member.Name;
            PropertyReference = property;

            var propertyAttributes = body.Member.GetCustomAttributes<PropertyAttribute>(false).Concat(PropertyInfo.PropertyType.GetCustomAttributes<PropertyAttribute>().Where(a => a.Reference));
            var classAttributes = storage.GetAll();

            StorageDefinition = storage;
            
            foreach (var attribute in GetAttributeList(propertyAttributes, classAttributes))
            {
                attribute.Initialize(this);
                set = attribute.FilterSet(this, set);
                get = attribute.FilterGet(this, get);
            }
            
            Get = get.Compile();
            Set = set.Compile();

            ToGet = get;
            ToSet = set;
        }

        private static IEnumerable<PropertyAttribute> GetAttributeList(IEnumerable<PropertyAttribute> propertyAttributes, IEnumerable<PropertyAttribute> classAttributes)
        {
            var list = propertyAttributes.Concat(classAttributes).OrderBy(a => a.Order);

            bool foundStorage = false;
            using (var enumerator = list.GetEnumerator())
            {
                while (enumerator.MoveNext())
                {
                    if (enumerator.Current.Order == PropertyAttributeOrder.Storage)
                    {
                        foundStorage = true;
                    }
                    else if (enumerator.Current.Order > PropertyAttributeOrder.Storage && !foundStorage)
                    {
                        foundStorage = true;
                        yield return new FieldAttribute();
                    }
                    yield return enumerator.Current;
                }
            }
            if (!foundStorage)
            {
                yield return new FieldAttribute();
            }
        }

        public string Name { get; set; }

        public IPropertyStorageDefinition StorageDefinition { get; set; }

        public Expression<Func<TOwner, TProperty>> PropertyReference { get; set; }

        public Expression<Func<TOwner, TProperty>> ToGet { get; set; }
        public Expression<Action<TOwner, TProperty>> ToSet { get; set; }

        public Func<TOwner, TProperty> Get { get; set; }
        public Action<TOwner, TProperty> Set { get; set; }

        public PropertyInfo PropertyInfo { get; private set; }
    }

    public interface IStorageProperty
    {

    }

    public class PropertyStorage : IPropertyStorage
    {
        public PropertyStorage(IPropertyStorageDefinition definition)
        {
            Definition = definition;
            Values = new object[definition.FieldCount];
        }

        public IPropertyStorageDefinition Definition { get; set; }

        public object[] Values { get; set; }

        public TProperty Get<TProperty>(int index)
        {
            return (TProperty)Values[index];
        }

        public void Set<TProperty>(TProperty newValue, int index)
        {
            Values[index] = newValue;
        }
    }

    public interface IPropertyStorageDefinition
    {
        int FieldCount { get; set; }
        IEnumerable<PropertyAttribute> ClassAttributes { get; }

        IPropertyStorage Create();

        IPropertyStorageDefinition BaseDefinition { get; set; }
    }

    public class PropertyStorageDefinition<TOwner> : IPropertyStorageDefinition
        where TOwner : IPropertyChangeable
    {
        private static readonly MethodInfo CreatePropertyMethod = typeof(PropertyStorageDefinition<TOwner>).GetMethod("CreateProperty", BindingFlags.NonPublic | BindingFlags.Instance);

        public PropertyStorageDefinition(Type type) : this(Properties.GetStorage<TOwner>(type.BaseType))
        {
            ClassAttributes = type.GetCustomAttributes<PropertyAttribute>(false);

            foreach (var property in type.GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                var p = CreatePropertyMethod.MakeGenericMethod(property.PropertyType).Invoke(this, new object[] { property });
            }
        }

        public PropertyStorageDefinition(IPropertyStorageDefinition baseDefinition)
        {
            BaseDefinition = baseDefinition;
            if (baseDefinition != null)
            {
                FieldCount = baseDefinition.FieldCount;
            }
        }

        public IPropertyStorageDefinition BaseDefinition { get; set; }

        public int FieldCount { get; set; }

        public IPropertyStorage Create()
        {
            return new PropertyStorage(this);
        }

        public IEnumerable<PropertyAttribute> ClassAttributes { get; private set; }

        private Dictionary<string, IProperty<TOwner>> _properties = new Dictionary<string, IProperty<TOwner>>();

        public Property<TOwner, TProperty> GetProperty<TProperty>(Expression<Func<TOwner, TProperty>> property)
        {
            var member = property.Body as MemberExpression;

            IProperty<TOwner> prop;
            _properties.TryGetValue(member.Member.Name, out prop);
            return (Property<TOwner, TProperty>)prop;
        }

        private IProperty<TOwner> CreateProperty<TProperty>(PropertyInfo property)
        {
            var owner = Expression.Parameter(Types<TOwner>.Type, "owner");
            var expression = Expression.Lambda<Func<TOwner, TProperty>>(Expression.Property(owner, property), owner);

            var result = new Property<TOwner, TProperty>(this, expression);

            _properties.Add(property.Name, result);

            return result;
        }
    }

    public enum PropertyAttributeOrder
    {
        Storage,
        Notification,
        Filter
    }

    public abstract class PropertyAttribute : Attribute, IPropertyFilter
    {
        public virtual void Initialize<TOwner, TProperty>(Property<TOwner, TProperty> property)
            where TOwner : IPropertyChangeable
        {
        }

        public virtual Expression<Func<TOwner, TProperty>> FilterGet<TOwner, TProperty>(Property<TOwner, TProperty> property, Expression<Func<TOwner, TProperty>> get) where TOwner : IPropertyChangeable
        {
            return get;
        }

        public virtual Expression<Action<TOwner, TProperty>> FilterSet<TOwner, TProperty>(Property<TOwner, TProperty> property, Expression<Action<TOwner, TProperty>> set) where TOwner : IPropertyChangeable
        {
            return set;
        }

        public PropertyAttributeOrder Order { get; set; }

        public bool Reference { get; set; }
    }

    public class LazyAttribute : PropertyAttribute
    {
        private MethodInfo _createMethod;

        public LazyAttribute()
        {
            Order = PropertyAttributeOrder.Filter;
        }

        public override void Initialize<TOwner, TProperty>(Property<TOwner, TProperty> property)
        {
            base.Initialize<TOwner, TProperty>(property);

            _createMethod = Types<TOwner>.Type.GetMethod("Create" + property.Name, BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
        }

        public override Expression<Func<TOwner, TProperty>> FilterGet<TOwner, TProperty>(Property<TOwner, TProperty> property, Expression<Func<TOwner, TProperty>> get)
        {
            var currentValue = Expression.Variable(Types<TProperty>.Type, "currentValue");

            var newGet = Expression.Block(Types<TProperty>.Type, new[] { currentValue },
                Expression.Assign(currentValue, get.Body),
                Expression.IfThen(Expression.Equal(currentValue, Expression.Constant(null)),
                    Expression.Block(
                    Expression.Assign(currentValue, 
                        _createMethod == null ? Expression.New(Types<TProperty>.Type)
                            : (Expression)Expression.Call(get.Parameters[0], _createMethod)),
                    Expression.Assign(Expression.Property(get.Parameters[0], property.PropertyInfo), currentValue))),
                currentValue);

            return Expression.Lambda<Func<TOwner, TProperty>>(newGet, get.Parameters);
        }
    }

    public class FieldAttribute : PropertyAttribute
    {
        public FieldAttribute()
        {
            Order = PropertyAttributeOrder.Storage;
        }

        public override void Initialize<TOwner, TProperty>(Property<TOwner, TProperty> property)
        {
            base.Initialize(property);

            Index = property.StorageDefinition.FieldCount++;
        }

        public int Index { get; set; }

        public override Expression<Action<TOwner, TProperty>> FilterSet<TOwner, TProperty>(Property<TOwner, TProperty> property, Expression<Action<TOwner, TProperty>> set)
        {
            return (owner, newValue) => owner.Storage.Set(newValue, Index);
        }
        public override Expression<Func<TOwner, TProperty>> FilterGet<TOwner, TProperty>(Property<TOwner, TProperty> property, Expression<Func<TOwner, TProperty>> get)
        {
            return owner => owner.Storage.Get<TProperty>(Index);
        }
    }

    public static class Types
    {
        public static TypeDescription Get(Type type)
        {
            return new TypeDescription(type);
        }
    }

    public class TypeDescription
    {
        public TypeDescription(Type type)
        {
            Type = type;
            BaseType = type.BaseType;
        }

        public Type Type { get; set; }
        public Type BaseType { get; set; }
    }

    public static class Types<T>
    {
        public static readonly Type Type = typeof(T);
        public static readonly Type BaseType = typeof(T).BaseType;
    }

    public static class Properties
    {
        internal static Dictionary<Type, Func<IPropertyStorageDefinition>> _storages =
            new Dictionary<Type, Func<IPropertyStorageDefinition>>();

        private static ReaderWriterLockSlim _lock = new ReaderWriterLockSlim(LockRecursionPolicy.SupportsRecursion);
        internal static IPropertyStorageDefinition GetStorage<TOwner>(Type baseType)
            where TOwner : IPropertyChangeable
        {
            if (Types<IPropertyChangeable>.Type.IsAssignableFrom(baseType))
            {
                var properties = typeof(Properties<>).MakeGenericType(baseType);
                var field = properties.GetField("Storage", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
                return (IPropertyStorageDefinition)field.GetValue(null);
            }
            return null;
        }

        public static Property<TOwner, TProperty> GetProperty<TOwner, TProperty>(this TOwner owner, Expression<Func<TOwner, TProperty>> property)
            where TOwner : IPropertyChangeable
        {
            return Properties<TOwner>.Storage.GetProperty(property);
        }

        public static TProperty Get<TOwner, TProperty>(this TOwner owner, Expression<Func<TOwner, TProperty>> property)
            where TOwner : IPropertyChangeable
        {
            return owner.GetProperty(property).Get(owner);
        }

        public static void Set<TOwner, TProperty>(this TOwner owner, Expression<Func<TOwner, TProperty>> property, TProperty newValue)
            where TOwner : IPropertyChangeable
        {
            owner.GetProperty(property).Set(owner, newValue);
        }

        internal static IEnumerable<PropertyAttribute> GetAll(this IPropertyStorageDefinition storage)
        {
            while (storage != null)
            {
                foreach (var attribute in storage.ClassAttributes.Where(a => !a.Reference))
                {
                    yield return attribute;
                }
                storage = storage.BaseDefinition;
            }
        }
    }


    public static class Properties<TOwner>
        where TOwner : IPropertyChangeable
    {
        public static readonly PropertyStorageDefinition<TOwner> Storage = new PropertyStorageDefinition<TOwner>(Types<TOwner>.Type);
    }

    public class PropertyChangeable : IPropertyChangeable
    {
        public PropertyChangeable()
        {
            _storage = Properties.GetStorage<PropertyChangeable>(GetType()).Create();
        }

        private IPropertyStorage _storage;

        IPropertyStorage IPropertyChangeable.Storage
        {
            get
            {
                return _storage;
            }
            set
            {
                _storage = value;
            }
        }
    }

    public interface IPropertyFilter
    {
        Expression<Func<TOwner, TProperty>> FilterGet<TOwner, TProperty>(Property<TOwner, TProperty> property, Expression<Func<TOwner, TProperty>> get)
            where TOwner : IPropertyChangeable;
        Expression<Action<TOwner, TProperty>> FilterSet<TOwner, TProperty>(Property<TOwner, TProperty> property, Expression<Action<TOwner, TProperty>> set)
            where TOwner : IPropertyChangeable;
    }

    public class PropertyFilterAttribute : Attribute
    {
        public PropertyFilterAttribute(Type propertyFilterType)
        {
            PropertyFilterType = propertyFilterType;
        }

        public Type PropertyFilterType { get; set; }
    }

    public class PropertyFilter : IPropertyFilter
    {
        public virtual Expression<Func<TOwner, TProperty>> FilterGet<TOwner, TProperty>(Property<TOwner, TProperty> property, Expression<Func<TOwner, TProperty>> get) where TOwner : IPropertyChangeable
        {
            return get;
        }

        public virtual Expression<Action<TOwner, TProperty>> FilterSet<TOwner, TProperty>(Property<TOwner, TProperty> property, Expression<Action<TOwner, TProperty>> set) where TOwner : IPropertyChangeable
        {
            return set;
        }
    }

    [Monitorable.NotifyPropertyChanged]
    public class Monitorable : PropertyChangeable, INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        private void NotifyPropertyChanged(string name)
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(name));
            }
        }

        public class NotifyPropertyChangedAttribute : PropertyAttribute
        {
            private static readonly MethodInfo Notify = Types<Monitorable>.Type.GetMethod("NotifyPropertyChanged", BindingFlags.NonPublic | BindingFlags.Instance);

            public NotifyPropertyChangedAttribute()
            {
                Order = PropertyAttributeOrder.Filter;
            }

            public override Expression<Action<TOwner, TProperty>> FilterSet<TOwner, TProperty>(Property<TOwner, TProperty> property, Expression<Action<TOwner, TProperty>> set)
            {
                return Expression.Lambda<Action<TOwner, TProperty>>(Expression.Block(
                    Expression.Call(set.Parameters[0], Notify, Expression.Constant(property.Name)),
                    set.Body), set.Parameters);
            }
        }
    }

    public class Named : Monitorable, INamed
    {
        public string Name
        {
            get
            {
                return this.Get(t => t.Name);
            }
            set
            {
                this.Set(t => t.Name, value);
            }
        }

        public override string ToString()
        {
            return String.Format("{0} ({1})", GetType().Name, Name);
        }
    }
}

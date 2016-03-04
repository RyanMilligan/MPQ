using MPQSim.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Runtime.CompilerServices;
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

            var all = GetAttributeList(propertyAttributes, classAttributes).ToArray();
            var attributes = all.Aggregate((last, current) =>
            {
                if (last != null)
                {
                    current.Next = last;
                }
                return current;
            });

            attributes.Initialize<TOwner, TProperty, TProperty>(this);

            get = attributes.FilterGet<TOwner, TProperty, TProperty>(this);

            Get = get.Compile();
            ToGet = get;

            set = attributes.FilterSet<TOwner, TProperty, TProperty>(this);
            
            Set = set.Compile();

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
        public PropertyStorageDefinition(Type type) : this(Properties.GetStorage<TOwner>(type.BaseType))
        {
            ClassAttributes = type.GetCustomAttributes<PropertyAttribute>(false);
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

        internal IProperty<TOwner> CreateProperty<TProperty>(Expression<Func<TOwner, TProperty>> property)
        {
            var result = new Property<TOwner, TProperty>(this, property);

            _properties.Add(result.Name, result);

            return result;
        }
    }

    public enum PropertyAttributeOrder
    {
        Storage,
        Filter,
        Notification
    }

    public enum PropertyAttributeContext
    {
        Direct = 1,
        Reference = 2,
        List = 4
    }

    public interface IPropertyFilter
    {
        IPropertyFilter Next { get; set; }

        void Initialize<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
            where TOwner : IPropertyChangeable;
        Expression<Func<TOwner, TStorage>> FilterGet<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
            where TOwner : IPropertyChangeable;
        Expression<Action<TOwner, TStorage>> FilterSet<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
            where TOwner : IPropertyChangeable;
    }

    public abstract class PropertyAttribute : Attribute, IPropertyFilter
    {
        public virtual void Initialize<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
            where TOwner : IPropertyChangeable
        {
            if (Next != null)
            {
                Next.Initialize<TOwner, TProperty, TStorage>(property);
            }
        }

        public IPropertyFilter Next { get; set; }

        public virtual Expression<Func<TOwner, TStorage>> FilterGet<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property) where TOwner : IPropertyChangeable
        {
            return Next.FilterGet<TOwner, TProperty, TStorage>(property);
        }

        public virtual Expression<Action<TOwner, TStorage>> FilterSet<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property) where TOwner : IPropertyChangeable
        {
            return Next.FilterSet<TOwner, TProperty, TStorage>(property);
        }

        public PropertyAttributeOrder Order { get; set; }

        public bool Reference { get; set; }
    }

    public class WeakAttribute : PropertyAttribute
    {
        public WeakAttribute()
        {
            Order = PropertyAttributeOrder.Filter;
        }

        public override void Initialize<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
        {
            base.Initialize<TOwner, TProperty, WeakReference>(property);
        }

        public override Expression<Func<TOwner, TStorage>> FilterGet<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
        {
            var get = base.FilterGet<TOwner, TProperty, WeakReference>(property);
            return Expression.Lambda<Func<TOwner, TStorage>>(Expression.Convert(Expression.Property(get.Body, "Target"), Types<TProperty>.Type), get.Parameters);
        }

        private static ConstructorInfo weakReferenceCtor = Types<WeakReference>.Type.GetConstructor(new[] { Types<object>.Type });
        public override Expression<Action<TOwner, TStorage>> FilterSet<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
        {
            var set = base.FilterSet<TOwner, TProperty, WeakReference>(property);

            var newValue = Expression.Parameter(Types<TStorage>.Type, "newValue");

            var reference = Expression.Parameter(Types<WeakReference>.Type, "reference");
            return Expression.Lambda<Action<TOwner, TStorage>>(Expression.Block(new[] { reference },
                Expression.Assign(reference, Expression.New(weakReferenceCtor, newValue)),
                Expression.Invoke(set, set.Parameters[0], reference)),
            set.Parameters[0], newValue);
        }
    }

    public class LazyAttribute : PropertyAttribute
    {
        private MethodInfo _createMethod;

        public LazyAttribute()
        {
            Order = PropertyAttributeOrder.Filter;
        }

        public override void Initialize<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
        {
            base.Initialize<TOwner, TProperty, TStorage>(property);

            _createMethod = Types<TOwner>.Type.GetMethod("Create" + property.Name, BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
        }

        public override Expression<Func<TOwner, TStorage>> FilterGet<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
        {
            var currentValue = Expression.Variable(Types<TProperty>.Type, "currentValue");

            var get = base.FilterGet<TOwner, TProperty, TStorage>(property);

            var newGet = Expression.Block(Types<TProperty>.Type, new[] { currentValue },
                Expression.Assign(currentValue, get.Body),
                Expression.IfThen(Expression.Equal(currentValue, Expression.Constant(null)),
                    Expression.Block(
                    Expression.Assign(currentValue, 
                        _createMethod == null ? Expression.New(Types<TProperty>.Type)
                            : (Expression)Expression.Call(get.Parameters[0], _createMethod)),
                    Expression.Assign(Expression.Property(get.Parameters[0], property.PropertyInfo), currentValue))),
                currentValue);

            return Expression.Lambda<Func<TOwner, TStorage>>(newGet, get.Parameters);
        }
    }

    public class FieldAttribute : PropertyAttribute
    {
        public FieldAttribute()
        {
            Order = PropertyAttributeOrder.Storage;
        }

        public override void Initialize<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
        {
            base.Initialize<TOwner, TProperty, TStorage>(property);

            Index = property.StorageDefinition.FieldCount++;
        }

        public int Index { get; set; }

        public override Expression<Action<TOwner, TStorage>> FilterSet<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
        {
            return (owner, newValue) => owner.Storage.Set(newValue, Index);
        }
        public override Expression<Func<TOwner, TStorage>> FilterGet<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
        {
            return owner => owner.Storage.Get<TStorage>(Index);
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
                var result = (IPropertyStorageDefinition)field.GetValue(null);

                RuntimeHelpers.RunClassConstructor(baseType.TypeHandle);

                return result;
            }
            return null;
        }

        public static Property<TOwner, TProperty> GetProperty<TOwner, TProperty>(this TOwner owner, Expression<Func<TOwner, TProperty>> property)
            where TOwner : IPropertyChangeable
        {
            return Properties<TOwner>.Storage.GetProperty(property);
        }

        public static TProperty Get<TOwner, TProperty>(this TOwner owner, Expression<Func<TOwner, TProperty>> property, IProperty<TOwner> storageProperty)
            where TOwner : IPropertyChangeable
        {
            return (storageProperty as Property<TOwner, TProperty>).Get(owner);
        }

        public static void Set<TOwner, TProperty>(this TOwner owner, Expression<Func<TOwner, TProperty>> property, TProperty newValue, IProperty<TOwner> storageProperty)
            where TOwner : IPropertyChangeable
        {
            (storageProperty as Property<TOwner, TProperty>).Set(owner, newValue);
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

        public static IProperty<TOwner> Property<TProperty>(Expression<Func<TOwner, TProperty>> property)
        {
            return Storage.CreateProperty(property);
        }
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

            public override Expression<Action<TOwner, TStorage>> FilterSet<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
            {
                var set = base.FilterSet<TOwner, TProperty, TStorage>(property);
                return Expression.Lambda<Action<TOwner, TStorage>>(Expression.Block(
                    set.Body,
                    Expression.Call(set.Parameters[0], Notify, Expression.Constant(property.Name))), set.Parameters);
            }
        }
    }

    public interface IOwned
    {
        object Owner { get; set; }
    }
    
    public class AttachToAttribute : PropertyAttribute
    {
        public AttachToAttribute()
        {
            Order = PropertyAttributeOrder.Filter;
        }

        MethodInfo detachMethod, attachMethod;
        public override void Initialize<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
        {
            base.Initialize<TOwner, TProperty, TStorage>(property);

            attachMethod = Types<TOwner>.Type.GetMethod("AttachTo" + property.Name, BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
            detachMethod = Types<TOwner>.Type.GetMethod("DetachFrom" + property.Name, BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
        }

        public override Expression<Action<TOwner, TStorage>> FilterSet<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
        {
            var set = base.FilterSet<TOwner, TProperty, TStorage>(property);
            var currentValue = Expression.Variable(Types<TProperty>.Type, "currentValue");
            return Expression.Lambda<Action<TOwner, TStorage>>(Expression.Block(new[] { currentValue },
                Expression.Assign(currentValue, Expression.Invoke(property.ToGet, set.Parameters[0])),
                Expression.IfThen(Expression.ReferenceNotEqual(currentValue, Expression.Constant(null)),
                    Expression.Call(set.Parameters[0], detachMethod)),
                set.Body,
                Expression.IfThen(Expression.ReferenceNotEqual(set.Parameters[1], Expression.Constant(null)),
                    Expression.Call(set.Parameters[0], attachMethod))
                ), set.Parameters);
        }
    }

    public class OwnedAttribute : PropertyAttribute
    {
        public OwnedAttribute()
        {
            Order = PropertyAttributeOrder.Filter;
        }

        PropertyInfo ownerAttribute;
        public override void Initialize<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
        {
            base.Initialize<TOwner, TProperty, TStorage>(property);

            ownerAttribute = Types<TProperty>.Type.GetProperty("Owner", BindingFlags.Instance | BindingFlags.Public);
        }

        public override Expression<Action<TOwner, TStorage>> FilterSet<TOwner, TProperty, TStorage>(Property<TOwner, TProperty> property)
        {
            var set = base.FilterSet<TOwner, TProperty, TStorage>(property);
            return Expression.Lambda<Action<TOwner, TStorage>>(Expression.Block(
                Expression.IfThen(Expression.ReferenceNotEqual(set.Parameters[1], Expression.Constant(null)),
                    Expression.Assign(Expression.Property(set.Parameters[1], ownerAttribute), set.Parameters[0])
                ),
                set.Body), set.Parameters);
        }
    }

    [Owned(Reference = true)]
    public class Owned<TOwner> : Monitorable
    {
        public TOwner Owner
        {
            get { return this.Get(t => t.Owner, _Owner); }
            set { this.Set(t => t.Owner, value, _Owner); }
        }
        private static readonly IProperty<Owned<TOwner>> _Owner = Properties<Owned<TOwner>>.Property(t => t.Owner);

        protected virtual void AttachToOwner(IPropertyChangeable owner)
        {
        }

        protected virtual void DetachFromOwner(IPropertyChangeable owner)
        {

        }
    }

    public class Named : Monitorable, INamed
    {
        public string Name
        {
            get { return this.Get(t => t.Name, _Name); }
            set { this.Set(t => t.Name, value, _Name); }
        }
        private static readonly IProperty<Named> _Name = Properties<Named>.Property(t => t.Name);

        public override string ToString()
        {
            return String.Format("{0} ({1})", GetType().Name, Name);
        }
    }
}

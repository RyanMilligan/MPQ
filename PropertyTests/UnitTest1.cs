using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MPQSim.Base;

namespace PropertyTests
{
    [TestClass]
    public class BasicPropertyTests
    {
        [TestMethod]
        public void TestField()
        {
            var test = new BasicField();

            Assert.AreEqual(null, test.Value);
            test.Value = "test";
            Assert.AreEqual("test", test.Value);
        }

        [TestMethod]
        public void LazyField()
        {
            var test = new LazyField();

            var first = test.Value;

            Assert.IsNotNull(first);

            var second = test.Value;
            Assert.AreEqual(first, second);
        }

        [TestMethod]
        public void AlwaysLazyField()
        {
            var test = new LazyField();

            var first = test.Always;

            Assert.IsNotNull(first);

            var second = test.Always;
            Assert.AreEqual(first, second);
        }

        [TestMethod]
        public void TestObservable()
        {
            var test = new ObservableField();

            Assert.IsNull(test.Value);

            bool propertyChangedFired = false;
            test.PropertyChanged += (s, e) =>
            {
                propertyChangedFired = true;
            };

            test.Value = "test";

            Assert.IsTrue(propertyChangedFired);

            Assert.AreEqual("test", test.Value);
        }

        [TestMethod]
        public void TestCustomLazy()
        {
            var test = new CustomLazy();

            var first = test.Value;

            Assert.IsNotNull(first);

            var second = test.Value;
            Assert.AreEqual(first, second);

            Assert.AreEqual("thing", second.Value);
        }

        [TestMethod]
        public void TestOwned()
        {
            var test = new LazyField();

            var first = test.Value;

            Assert.AreEqual(first.Owner, test);
        }

        [TestMethod]
        public void TestAttached()
        {
            var test = new AttachedTest();

            test.Thing = new BasicField();

           Assert.AreEqual(test, test.Thing.Owner);
        }
    }

    public class BasicField : Owned<IPropertyChangeable>
    {
        public string Value
        {
            get { return this.Get(t => t.Value, _Value); }
            set { this.Set(t => t.Value, value, _Value); }
        }
        private static readonly IProperty<BasicField> _Value = Properties<BasicField>.Property(t => t.Value);
    }

    public class LazyField : PropertyChangeable
    {
        [Lazy]
        public BasicField Value
        {
            get { return this.Get(t => t.Value, _Value); }
            set { this.Set(t => t.Value, value, _Value); }
        }
        private static readonly IProperty<LazyField> _Value = Properties<LazyField>.Property(t => t.Value);

        public AlwaysLazy Always
        {
            get { return this.Get(t => t.Always, _Always); }
            set { this.Set(t => t.Always, value, _Always); }
        }
        private static readonly IProperty<LazyField> _Always = Properties<LazyField>.Property(t => t.Always);

    }

    public class CustomLazy : PropertyChangeable
    {
        [Lazy]
        public BasicField Value
        {
            get { return this.Get(t => t.Value, _Value); }
            set { this.Set(t => t.Value, value, _Value); }
        }
        private static readonly IProperty<CustomLazy> _Value = Properties<CustomLazy>.Property(t => t.Value);


        private BasicField CreateValue()
        {
            return new BasicField()
            {
                Value = "thing"
            };
        }
    }

    public class ObservableField : Monitorable
    {
        public string Value
        {
            get { return this.Get(t => t.Value, _Value); }
            set { this.Set(t => t.Value, value, _Value); }
        }
        private static readonly IProperty<ObservableField> _Value = Properties<ObservableField>.Property(t => t.Value);

    }

    public class AttachedTest : PropertyChangeable
    {
        [AttachTo]
        public BasicField Thing
        {
            get { return this.Get(t => t.Thing, _Thing); }
            set { this.Set(t => t.Thing, value, _Thing); }
        }
        private static readonly IProperty<AttachedTest> _Thing = Properties<AttachedTest>.Property(t => t.Thing);

        private void AttachToThing()
        {
            Attached = true;
        }

        private void DetachFromThing()
        {
            Attached = false;
        }

        public bool Attached { get; set; }
    }

    [Lazy(Reference = true)]
    public class AlwaysLazy
    {
    }
}

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
    }

    public class BasicField : PropertyChangeable
    {
        public string Value {  get { return this.Get(t => t.Value); } set { this.Set(t => t.Value, value); } }
    }

    public class LazyField : PropertyChangeable
    {
        [Lazy]
        public BasicField Value { get { return this.Get(t => t.Value); } set { this.Set(t => t.Value, value); } }

        public AlwaysLazy Always
        {
            get { return this.Get(t => t.Always); }
            set { this.Set(t => t.Always, value); }
        }
    }

    public class CustomLazy : PropertyChangeable
    {
        [Lazy]
        public BasicField Value { get { return this.Get(t => t.Value); } set { this.Set(t => t.Value, value); } }

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
        public string Value { get { return this.Get(t => t.Value); } set { this.Set(t => t.Value, value); } }
    }

    [Lazy(Reference = true)]
    public class AlwaysLazy
    {
    }
}

using Moq;
using System;
using ResourceAllocationBE.Model;
using Xunit;
using Xunit.Abstractions;

namespace ResourceAllocation.UnitTest.ResourcePoolTest
{
    public class ResourcePoolProcessorUnitTest
    {
        private readonly ITestOutputHelper output;

        public ResourcePoolProcessorUnitTest(ITestOutputHelper output)
        {
            this.output = output;
        }
        // test update
        // check lại
        // null
        [Fact]
        public void TestInvalidUpdateResourceEmployeeInputNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => resourcePoolProcessor.updateResourcePool(
             start_date:"",
             end_date: "06/06/2022",
             effort:50,
             bill:50

            ));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void TestInvalidUpdateResourceEmployeeInputNull2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => resourcePoolProcessor.updateResourcePool(
             start_date: "05/05/2022",
             end_date: "",
             effort: 50,
             bill: 50

            ));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void TestInvalidUpdateResourceEmployeeInputMoreThan100Percent3()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => resourcePoolProcessor.updateResourcePool(
             start_date: "05/05/2022",
             end_date: "06/06/2022",
             effort: 250,
             bill: 50

            ));
            output.WriteLine("%bill or %effort not more than 100%");
        }
        [Fact]
        public void TestInvalidUpdateResourceEmployeeInputMoreThan100Percent4()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => resourcePoolProcessor.updateResourcePool(
             start_date: "05/05/2022",
             end_date: "06/06/2022",
             effort: 50,
             bill: 250

            ));
            output.WriteLine("%bill or %effort not more than 100%");
        }
        // true
        [Fact]
        public void TestValidUpdateResourceEmployee()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.UpdateResourcePool(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>(), It.IsAny<int>())).Returns(true);
            var projectProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.True(projectProcessor.updateResourcePool(
            
                start_date : "05/05/2022",
                end_date : "06/06/2022",
                effort:50,
                bill:50
            ));
            output.WriteLine("success");
        }


        // INSERT 
        //true
        [Fact]
        public void TestValidInsertResourceEmployee()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.InsertResourcePool(It.IsAny<ResourcePlanningEmployee>())).Returns(true);

            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.True(resourcePoolProcessor.insertResourcePool(new ResourcePlanningEmployee
            {
                Employee_id=1,
                Role_id=1,
                Level_id=1,
                Skill_id=1,
            }));
            output.WriteLine("success");
        }
        // null
        [Fact]
        public void TestInvalidInsertResourceEmployee()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => resourcePoolProcessor.insertResourcePool(new ResourcePlanningEmployee
            {
                Employee_id = 1,
                Role_id = -1,
                Level_id = 0,
                Skill_id = 1,
            }));
            output.WriteLine("not positive number");
        }

    }
}

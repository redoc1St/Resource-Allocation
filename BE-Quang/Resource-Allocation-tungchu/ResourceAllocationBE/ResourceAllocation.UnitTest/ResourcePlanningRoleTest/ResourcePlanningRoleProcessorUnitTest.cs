using System;
using Xunit;
using ResourceAllocationBE.Controllers;
using Moq;
using ResourceAllocationBE.Model;
using Xunit.Abstractions;

namespace ResourceAllocation.UnitTest.ResourcePlanningRoleTest
{
    public class ResourcePlanningRoleProcessorUnitTest
    {
        private readonly ITestOutputHelper output;

        public ResourcePlanningRoleProcessorUnitTest(ITestOutputHelper output)
        {
            this.output = output;
        }

        // TEST INSERT ROLE PLANNING
        // null
        [Fact]
        public void TestInvalidInsertResourcePlanningRoleInputNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.insertResourcePlanning(new ResourcePlanningRole
            {
                Quantity = 0,
                Effort_planned = 50,
                Bill_rate = 50,
                Date_start = "",
                Date_end = "10/05/2022"
            }));
            output.WriteLine("Input not null");
        }

        // null
        [Fact]
        public void TestInvalidInsertResourcePlanningRoleInputNull2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.insertResourcePlanning(new ResourcePlanningRole
            {
                Quantity = 2,
                Effort_planned = 50,
                Bill_rate = 50,
                Date_start = "05/05/2022",
                Date_end = ""
            }));
            output.WriteLine("Input not null");
        }
        // null
        [Fact]
        public void TestInvalidInsertResourcePlanningRoleInputNull3()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.insertResourcePlanning(new ResourcePlanningRole
            {
                Quantity = 2,
                Effort_planned = 50,
                Bill_rate = 0,
                Date_start = "05/05/2022",
                Date_end = "05/05/2022"
            }));
            output.WriteLine("Quantity not equal 0");
        }
        // null
        [Fact]
        public void TestInvalidInsertResourcePlanningRoleInputNull4()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.insertResourcePlanning(new ResourcePlanningRole
            {
                Quantity = 2,
                Effort_planned = 0,
                Bill_rate = 50,
                Date_start = "05/05/2022",
                Date_end = "05/05/2022"
            }));
            output.WriteLine("Quantity not equal 0");
        }
        // quantity not <=0 
        [Fact]
        public void TestInvalidInsertResourcePlanningRoleQuantityMoreThan0()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.insertResourcePlanning(new ResourcePlanningRole
            {
                Quantity=0,
                Effort_planned=50,
                Bill_rate=50,
                Date_start = "05/05/2022",
                Date_end = "10/05/2022"
            }));
            output.WriteLine("Quantity not equal 0");
        }
        // >100
        [Fact]
        public void TestInvalidInsertResourcePlanningRoleMoreThan100Percent()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.insertResourcePlanning(new ResourcePlanningRole
            {
                Quantity = 2,
                Effort_planned = 250,
                Bill_rate = 50,
                Date_start = "05/05/2022",
                Date_end = "10/05/2022"
            }));
            output.WriteLine("No more than 100%");
        }
        // >100
        [Fact]
        public void TestInvalidInsertMorethan100ResourcePlanningRoleMoreThan100Percent2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.insertResourcePlanning(new ResourcePlanningRole
            {
                Quantity = 2,
                Effort_planned = 50,
                Bill_rate = 250,
                Date_start = "05/05/2022",
                Date_end = "10/05/2022"
            }));
            output.WriteLine("No more than 100%");
        }
        // true
        [Fact]
        public void TestValidInsertResourcePlanningRole()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.InsertResourcePlanningRole(It.IsAny<ResourcePlanningRole>())).Returns(true);

            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.True(projectProcessor.insertResourcePlanning(new ResourcePlanningRole
            {
                Quantity = 2,
                Effort_planned = 50,
                Bill_rate = 50,
                Date_start = "05/05/2022",
                Date_end = "10/05/2022"
            }));
            output.WriteLine("success");
        }










        // TEST UPDATE ROLE PLANNING
        // quantity not <=0 
        [Fact]
        public void TestInvalidUpdateResourcePlanningRoleQuantityMoreThan0()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.updateResourcePlanning(
                quantity: -1,
                plannedEffort: 50,
                bill:50,
                start_date :"05/05/2022",
                end_date :"10/05/2022"
            ));
            output.WriteLine("Quantity not equal 0");
        }
        [Fact]
        public void TestInvalidUpdateMorethan100ResourcePlanningRole()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.updateResourcePlanning(
                quantity: 2,
                plannedEffort: 250,
                bill: 50,
                start_date: "05/05/2022",
                end_date: "10/05/2022"
            ));
            output.WriteLine("%bill or %effort not more than 100%");
        }
        [Fact]
        public void TestInvalidUpdateMorethan100ResourcePlanningRole2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.updateResourcePlanning(
                quantity: 2,
                plannedEffort: 50,
                bill: 250,
                start_date: "05/05/2022",
                end_date: "10/05/2022"
            ));
            output.WriteLine("%bill or %effort not more than 100%");
        }
        [Fact]
        public void TestInvalidUpdateResourcePlanningRole3()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.updateResourcePlanning(
                quantity: 2,
                plannedEffort: 50,
                bill: 50,
                start_date: "05/05/2022",
                end_date: ""
            ));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void TestInvalidUpdateResourcePlanningRole4()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.updateResourcePlanning(
                quantity: 2,
                plannedEffort: 50,
                bill: 50,
                start_date: "",
                end_date: "10/05/2022"
            ));
            output.WriteLine("Input not null");
        }
        // true
        [Fact]
        public void TestValidUpdateResourcePlanningRole()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.UpdateResourcePlanningRole(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<string>(), It.IsAny<string>())).Returns(true);

            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.True(projectProcessor.updateResourcePlanning(
                quantity: 1,
                plannedEffort: 50,
                bill: 50,
                start_date: "05/05/2022",
                end_date: "10/05/2022"));
             output.WriteLine("success");
        }
    }
}

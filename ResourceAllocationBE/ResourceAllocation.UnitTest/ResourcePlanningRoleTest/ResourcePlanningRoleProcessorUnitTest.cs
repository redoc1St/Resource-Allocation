using System;
using Xunit;
using ResourceAllocationBE.Controllers;
using Moq;
using ResourceAllocationBE.Model;

namespace ResourceAllocation.UnitTest.ResourcePlanningRoleTest
{
    public class ResourcePlanningRoleProcessorUnitTest
    {
       

        // TEST INSERT ROLE PLANNING
        // null
        [Fact]
        public void TestInvalidInsertResourcePlanningRoleInputNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.insertResourcePlanning(new ResourcePlanningRole
            {
                Date_start="", Date_end=""
            }));
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
        }
        [Fact]
        public void TestInvalidUpdateResourcePlanningRole()
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
        }
        [Fact]
        public void TestInvalidUpdateResourcePlanningRole2()
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
        }
    }
}

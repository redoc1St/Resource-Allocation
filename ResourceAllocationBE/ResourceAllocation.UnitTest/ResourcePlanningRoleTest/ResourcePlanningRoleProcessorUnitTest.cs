using System;
using Xunit;
using ResourceAllocationBE.Controllers;
using Moq;
using ResourceAllocationBE.Model;

namespace ResourceAllocation.UnitTest.ResourcePlanningRoleTest
{
    public class ResourcePlanningRoleProcessorUnitTest
    {
        // VIEW RESOURCEPOOL BY ROLE
        [Fact]
        public void TestInvalidDataRoleName()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePlanningRoleProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => resourcePlanningRoleProcessor.viewResourcePoolByRole("project", "abcxyz"));
        }
        [Fact]
        public void TestValidDataRoleName()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePlanningRoleProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.True(resourcePlanningRoleProcessor.viewResourcePoolByRole("projectname1", "tester"));
        }

        // RESOURCE PLANNING ROLE DETAIL
        [Fact]
        public void TestProjectResourcePlanningRoleIdIsNotTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePlanningRoleProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => resourcePlanningRoleProcessor.getResourcePlanningDetail(new ResourcePlanningRole { Id = 0}));
        }
        [Fact]
        public void TestProjectResourcePlanningRoleIdIsTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePlanningRoleProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.True(resourcePlanningRoleProcessor.getResourcePlanningDetail(new ResourcePlanningRole { Id = 1 }));
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
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.updateResourcePlanning(new ResourcePlanningRole
            {
                Quantity = 0,
                Effort_planned = 50,
                Bill_rate = 50,
                Date_start = "05/05/2022",
                Date_end = "10/05/2022"
            }));
        }
        // true
        [Fact]
        public void TestValidUpdateResourcePlanningRole()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.UpdateResourcePlanningRole(It.IsAny<ResourcePlanningRole>())).Returns(true);

            var projectProcessor = new ResourcePlanningRoleProcessor(resourceAllocationProcessor.Object);
            Assert.True(projectProcessor.updateResourcePlanning(new ResourcePlanningRole
            {
                Quantity = 2,
                Effort_planned = 50,
                Bill_rate = 50,
                Date_start = "05/05/2022",
                Date_end = "10/05/2022"
            }));
        }
    }
}

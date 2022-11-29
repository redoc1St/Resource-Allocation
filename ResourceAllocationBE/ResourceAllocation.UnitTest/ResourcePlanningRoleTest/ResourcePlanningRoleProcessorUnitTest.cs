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



     
        							

    }
}

using Moq;
using System;
using ResourceAllocationBE.Model;
using Xunit;

namespace ResourceAllocation.UnitTest.ResourcePoolTest
{
    public class ResourcePoolProcessorUnitTest
    {

        [Fact]
        public void TestInValidTypeToGetListResourcePool()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => resourcePoolProcessor.getListResourcePool("employee"));
        }
        [Fact]
        public void TestInValidTypeToGetResourcePool()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => resourcePoolProcessor.getListResourcePool("leader"));
        }
        [Fact]
        public void TestValidTypeToGetListResourcePool()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.True(resourcePoolProcessor.getListResourcePool("admin"));
        }

        // GET LIST BY NAME
        [Fact]
        public void TestValidNameToGetListResourceEmployee()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.True(resourcePoolProcessor.getListResourcePoolByName("quang"));
        }
        // GET LIST EMPLOYEE BY ROLE, LEVEL, SKILL
        [Fact]
        public void TestInValidNullToGetListResourceEmployee2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => resourcePoolProcessor.getListResourcePoolByRLS("","",""));
        }
        [Fact]
        public void TestInValidNullToGetListResourceEmployee()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => resourcePoolProcessor.getListResourcePoolByRLS("", "fresher", ".NET"));
        }
        [Fact]
        public void TestValidRLSToGetListResourceEmployee()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.True(resourcePoolProcessor.getListResourcePoolByRLS("ba", "fresher", ".NET"));
        }


        // test update
        // null
        [Fact]
        public void TestInvalidInsertResourcePlanningRoleInputNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.updateResourcePool(new ResourcePlanningEmployee
            {
                Date_start = "",
                Date_end = ""
            }));
        }
        // true
        [Fact]
        public void TestValidUpdateResourcePlanningRole()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.UpdateResourcePool(It.IsAny<ResourcePlanningEmployee>())).Returns(true);

            var projectProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.True(projectProcessor.updateResourcePool(new ResourcePlanningEmployee
            {
                Date_start = "05/05/2022",
                Date_end = "10/05/2022",
                Effort=50,
                Bill_rate=50
            }));
        }
    }
}

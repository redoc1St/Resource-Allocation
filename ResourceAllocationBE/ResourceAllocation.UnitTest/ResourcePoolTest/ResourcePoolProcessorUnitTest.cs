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
        // check lại
        // null
        [Fact]
        public void TestInvalidUpdateResourceEmployeeInputNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => resourcePoolProcessor.updateResourcePool(new ResourcePlanningEmployee
            {
             
                
            }));
        }
        // true
        [Fact]
        public void TestValidUpdateResourceEmployee()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.UpdateResourcePool(It.IsAny<ResourcePlanningEmployee>())).Returns(true);

            var projectProcessor = new ResourcePoolProcessor(resourceAllocationProcessor.Object);
            Assert.True(projectProcessor.updateResourcePool(new ResourcePlanningEmployee
            {
                
            }));
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
                Role_id = 1,
                Level_id = 1,
                Skill_id = 1,
            }));
        }

    }
}

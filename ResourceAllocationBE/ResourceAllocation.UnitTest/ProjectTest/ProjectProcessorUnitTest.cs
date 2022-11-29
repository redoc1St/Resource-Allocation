using Moq;
using ResourceAllocationBE.Model;
using System;
using Xunit;
namespace ResourceAllocation.UnitTest.ProjectTest
{
    public class ProjectProcessorUnitTest
    {
        // TEST SEARCH PROJECT BY NAME
        [Fact]
        public void TestEmptyInputSearch()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.True(projectProcessor.searchProjectByName(new Project { ProjectName = "" }));
        }
        [Fact]
        public void TestInputSearchBar()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.True(projectProcessor.searchProjectByName(new Project { ProjectName = "projectname1" }));
        }


        // TEST GET PROJECT DETAIL
        [Fact]
        public void TestEmptyProjectCode()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.getDetailProject(new Project { Code = "" }));
        }
        [Fact]
        public void TestProjectCodeIsNoteTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.getDetailProject(new Project { Code = "AISSC001" }));
        }
        [Fact]
        public void TestProjectCodeIsTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.True(projectProcessor.getDetailProject(new Project { Code = "ais_0001" }));
        }
    }
}

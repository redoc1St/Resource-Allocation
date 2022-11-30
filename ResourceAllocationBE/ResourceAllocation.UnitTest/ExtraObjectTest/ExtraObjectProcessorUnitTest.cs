using Moq;
using System;
using ResourceAllocationBE.Model;
using Xunit;
using ResourceAllocation.UnitTest.NewFolder;

namespace ResourceAllocation.UnitTest.ExtraObjectTest
{
    public class ExtraObjectProcessorUnitTest
    {
        // GET LIST Pname BY ROLE, LEVEL, SKILL
        [Fact]
        public void TestInValidNullToGetListProjectName2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ExtraObjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => resourcePoolProcessor.getListPnameByRLS("", "", ""));
        }
        [Fact]
        public void TestInValidNullToGetListProjectName()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ExtraObjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => resourcePoolProcessor.getListPnameByRLS("", "fresher", ".NET"));
        }
        [Fact]
        public void TestValidRLSToGetListProjectName()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ExtraObjectProcessor(resourceAllocationProcessor.Object);
            Assert.True(resourcePoolProcessor.getListPnameByRLS("ba", "fresher", ".NET"));
        }

        // // GET Role ID BY ROLE, LEVEL, SKILL, Code
        [Fact]
        public void TestInValidNullToGetRoleId2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ExtraObjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => resourcePoolProcessor.getRoleIdByRLSCode("", "", "",""));
        }
        [Fact]
        public void TestInValidNullToGetRoleId3()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ExtraObjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => resourcePoolProcessor.getRoleIdByRLSCode("ba", "fresher", ".NET", ""));
        }
        [Fact]
        public void TestInValidNullToGetRoleId()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ExtraObjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => resourcePoolProcessor.getRoleIdByRLSCode("", "fresher", ".NET","ai_0001"));
        }
        [Fact]
        public void TestValidRLSToGetRoleId()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ExtraObjectProcessor(resourceAllocationProcessor.Object);
            Assert.True(resourcePoolProcessor.getRoleIdByRLSCode("ba", "fresher", ".NET","ais_0001"));
        }

        // Leader
        [Fact]
        public void TestInValidNullToGetLeaderInfor()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ExtraObjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => resourcePoolProcessor.getLeaderInfor(""));
        }
        [Fact]
        public void TestValidRLSToGetLeaderInfor()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var resourcePoolProcessor = new ExtraObjectProcessor(resourceAllocationProcessor.Object);
            Assert.True(resourcePoolProcessor.getLeaderInfor("ais_0001"));
        }
    }
}

using Moq;
using ResourceAllocationBE.Model;
using System;
using Xunit;

namespace ResourceAllocation.UnitTest.RequestTest
{
    public class RequestProcessorUnitTest 
    {
        //REQUEST TO ROLE PLANNING
        [Fact]
        public void TestValidResourceRoleIdToRequests()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.InsertRequestRole(It.IsAny<string>())).Returns(true);
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.True(requestProcessor.requestToRolePlanning("1"));
        }

        [Fact]
        public void TestEmptyResourceRoleIdToRequests()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => requestProcessor.requestToRolePlanning(""));
        }


        // RESPONSE ROLE TO PROJECT
        [Fact]
        public void TestValidResponseResourceRoleIdToRequests()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.True(requestProcessor.responseRequestRoleToProject("1"));
        }

        [Fact]
        public void TestEmptyResponseResourceRoleIdToRequests()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => requestProcessor.responseRequestRoleToProject(""));
        }

        //REQUEST INDIRECT EMPLOYEE TO ROLE PLANNING
        [Fact]
        public void TestValidResourceIndirectEmployeeToRoleRequests()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.InsertRequestEmployeeToRole(It.IsAny<string>(), It.IsAny<string>())).Returns(true);
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.True(requestProcessor.requestEmployeeToRolePlanning("2","2"));
        }

        [Fact]
        public void TestEmptyResourceIndirectEmployeeToROleRequest()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => requestProcessor.requestEmployeeToRolePlanning("",""));
        }

        //REQUEST DIRECT EMPLOYEE TO ROLE PLANNING
        [Fact]
        public void TestValidResourceDirectEmployeeToRoleRequests()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.InsertRequestEmployeeToRole(It.IsAny<string>(), It.IsAny<string>())).Returns(true);
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.True(requestProcessor.requestDirectEmployeeToRolePlanning("2", "2"));
        }

        [Fact]
        public void TestEmptyResourceDirectEmployeeToROleRequest()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => requestProcessor.requestDirectEmployeeToRolePlanning("", ""));
        }

        //Response Approved EMPLOYEE TO ROLE PLANNING
        [Fact]
        public void TestValidApprovedEmployeeToRoleRequests()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.True(requestProcessor.approveRequestEmp("2", "2"));
        }

        [Fact]
        public void TestEmptyApprovedEmployeeToROleRequest()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => requestProcessor.approveRequestEmp("", ""));
        }

        //Response Rejected EMPLOYEE TO ROLE PLANNING
        [Fact]
        public void TestValidRejectedEmployeeToRoleRequests()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.True(requestProcessor.rejectRequestEmp("2", "2"));
        }

        [Fact]
        public void TestEmptyRejectedEmployeeToROleRequest()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => requestProcessor.rejectRequestEmp("", ""));
        }
    }
}

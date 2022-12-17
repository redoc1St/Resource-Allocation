using Moq;
using ResourceAllocationBE.Model;
using System;
using Xunit;
using Xunit.Abstractions;

namespace ResourceAllocation.UnitTest.RequestTest
{
    public class RequestProcessorUnitTest 
    {
        private readonly ITestOutputHelper output;

        public RequestProcessorUnitTest(ITestOutputHelper output)
        {
            this.output = output;
        }
        //REQUEST INDIRECT EMPLOYEE TO ROLE PLANNING
        [Fact]
        public void TestValidResourceIndirectEmployeeToRoleRequests()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.InsertRequestEmployeeToRole(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>(), It.IsAny<int>())).Returns(true);
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.True(requestProcessor.requestEmployeeToRolePlanning("05/05/2022", "05/06/2022",50,50));
            output.WriteLine("success");
        }

        [Fact]
        public void TestEmptyResourceIndirectEmployeeToROleRequest()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => requestProcessor
            .requestEmployeeToRolePlanning("", "05/06/2022", 50, 50));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void TestEmptyResourceIndirectEmployeeToROleRequest2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => requestProcessor
            .requestEmployeeToRolePlanning("05/05/2022", "", 50, 50));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void TestEmptyResourceIndirectEmployeeToROleRequest3()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => requestProcessor
            .requestEmployeeToRolePlanning("05/05/2022", "05/06/2022", 150, 50));
            output.WriteLine("%bill or %effort not more than 100%");
        }
        [Fact]
        public void TestEmptyResourceIndirectEmployeeToROleRequest4()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => requestProcessor
            .requestEmployeeToRolePlanning("05/05/2022", "05/06/2022", 50, 250));
            output.WriteLine("%bill or %effort not more than 100%");
        }



        //REQUEST DIRECT EMPLOYEE TO ROLE PLANNING
        [Fact]
        public void TestValidResourceDirectEmployeeToRoleRequests()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.InsertRequestEmployeeToRole(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>(), It.IsAny<int>())).Returns(true);
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.True(requestProcessor.requestDirectEmployeeToRolePlanning("05/05/2022", "05/06/2022", 50, 50));
            output.WriteLine("success");
        }

        [Fact]
        public void TestEmptyResourceDirectEmployeeToROleRequest2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => requestProcessor
            .requestDirectEmployeeToRolePlanning("", "05/06/2022", 50, 50));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void TestEmptyResourceDirectEmployeeToROleRequest3()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => requestProcessor
            .requestDirectEmployeeToRolePlanning("05/05/2022", "", 50, 50));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void TestEmptyResourceDirectEmployeeToROleRequest4()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => requestProcessor
            .requestDirectEmployeeToRolePlanning("05/05/2022", "05/06/2022", 50, 250));
            output.WriteLine("%bill or %effort not more than 100%");
        }
        [Fact]
        public void TestEmptyResourceDirectEmployeeToROleRequest()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var requestProcessor = new RequestProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => requestProcessor
            .requestDirectEmployeeToRolePlanning("05/05/2022", "05/06/2022", 250, 50));
            output.WriteLine("%bill or %effort not more than 100%");
        }

        
    }
}

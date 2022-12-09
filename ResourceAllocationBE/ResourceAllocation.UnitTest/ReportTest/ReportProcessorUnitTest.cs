using Moq;
using System;
using Xunit;
using ResourceAllocationBE.Model;

namespace ResourceAllocation.UnitTest.ReportTest
{
    public class ReportProcessorUnitTest
    {
        [Fact]
        public void TestInValidTypeToGetListUser()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var reportProcessor = new ReportProcessor(resourceAllocationProcessor.Object);
            Assert.False(reportProcessor.getListReportResourceAllocation("employee"));
        }
        [Fact]
        public void TestInValidTypeToGetListUser2()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var reportProcessor = new ReportProcessor(resourceAllocationProcessor.Object);
            Assert.True(reportProcessor.getListReportResourceAllocation("leader"));
        }
        [Fact]
        public void TestValidTypeToGetListUser()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var reportProcessor = new ReportProcessor(resourceAllocationProcessor.Object);
            Assert.True(reportProcessor.getListReportResourceAllocation("admin"));
        }
        [Fact]
        public void TestInValidTypeToGetListUser3()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var reportProcessor = new ReportProcessor(resourceAllocationProcessor.Object);
            Assert.False(reportProcessor.getListReportResourceAllocation(""));
        }
    }
}

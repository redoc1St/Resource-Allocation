using Moq;
using System;
using Xunit;
using ResourceAllocationBE.Model;
using Xunit.Abstractions;

namespace ResourceAllocation.UnitTest.ReportTest
{
    public class ReportProcessorUnitTest
    {
        private readonly ITestOutputHelper output;

        public ReportProcessorUnitTest(ITestOutputHelper output)
        {
            this.output = output;
        }
        [Fact]
        public void TestInValidTypeToGetListUser()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var reportProcessor = new ReportProcessor(resourceAllocationProcessor.Object);
            Assert.False(reportProcessor.getListReportResourceAllocation("employee"));
            output.WriteLine("false");
        }
        [Fact]
        public void TestValidTypeToGetListUser2()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var reportProcessor = new ReportProcessor(resourceAllocationProcessor.Object);
            Assert.True(reportProcessor.getListReportResourceAllocation("leader"));
            output.WriteLine("success");
        }
        [Fact]
        public void TestValidTypeToGetListUser()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var reportProcessor = new ReportProcessor(resourceAllocationProcessor.Object);
            Assert.True(reportProcessor.getListReportResourceAllocation("admin"));
            output.WriteLine("success");
        }
        [Fact]
        public void TestInValidTypeToGetListUser3()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var reportProcessor = new ReportProcessor(resourceAllocationProcessor.Object);
            Assert.False(reportProcessor.getListReportResourceAllocation(""));
            output.WriteLine("false");
        }
    }
}

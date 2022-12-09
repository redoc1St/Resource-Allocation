using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceAllocation.UnitTest.ReportTest
{
    public class ReportProcessor : IReportProcessor
    {
        private readonly IResourceAllocationProcessor resourceAllocationProcessor;

        public ReportProcessor(IResourceAllocationProcessor resourceAllocationProcessor)
        {
            this.resourceAllocationProcessor = resourceAllocationProcessor;
        }
        public bool getListReportResourceAllocation(string type)
        {
            if (type != "admin" && type != "leader")
            {
                return false;
            }
            return true;
        }
    }
}

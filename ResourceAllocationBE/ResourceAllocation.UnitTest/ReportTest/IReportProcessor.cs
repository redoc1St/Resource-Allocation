using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceAllocation.UnitTest.ReportTest
{
  public  interface IReportProcessor
    {
        bool getListReportResourceAllocation(string type);
    }
}

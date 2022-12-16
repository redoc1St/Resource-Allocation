using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceAllocation.UnitTest.RequestTest
{
   public interface IRequestProcessor
    {
        bool requestEmployeeToRolePlanning(string start_date, string end_date,int effort, int bill);
        bool requestDirectEmployeeToRolePlanning(string start_date, string end_date, int effort, int bill);
    }
}

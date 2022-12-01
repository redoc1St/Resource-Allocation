using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceAllocation.UnitTest.RequestTest
{
   public interface IRequestProcessor
    {
        bool requestToRolePlanning(string rid);
        bool responseRequestRoleToProject(string rid);
        bool requestEmployeeToRolePlanning(string rid, string eid);
        bool approveRequestEmp(string rid, string eid);
        bool rejectRequestEmp(string rid, string eid);
        bool requestDirectEmployeeToRolePlanning(string rid, string eid);
    }
}

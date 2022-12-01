using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceAllocation.UnitTest.RequestTest
{
   public  class RequestProcessor : IRequestProcessor
    {
        private readonly IResourceAllocationProcessor resourceAllocationProcessor;

        public RequestProcessor(IResourceAllocationProcessor resourceAllocationProcessor)
        {
            this.resourceAllocationProcessor = resourceAllocationProcessor;
        }
        public bool approveRequestEmp(string rid, string eid)
        {
            if (rid == "" || eid == "")
            {
                throw new ArgumentNullException("Data not found");
            }
            return true;
        }

        public bool rejectRequestEmp(string rid, string eid)
        {
            if (rid == "" || eid == "")
            {
                throw new ArgumentNullException("Data not found");
            }
            return true;
        }

        public bool requestDirectEmployeeToRolePlanning(string rid, string eid)
        {
            if (rid == "" || eid == "")
            {
                throw new ArgumentNullException("Data not found");
            }
            return resourceAllocationProcessor.InsertRequestEmployeeToRole(rid, eid);
        }

        public bool requestEmployeeToRolePlanning(string rid, string eid)
        {
            if (rid == "" || eid =="")
            {
                throw new ArgumentNullException("Data not found");
            }
            return resourceAllocationProcessor.InsertRequestEmployeeToRole(rid,eid);
        }

        public bool requestToRolePlanning(string rid)
        {
            if (rid == "")
            {
                throw new ArgumentNullException("Data not found");
            }
            return resourceAllocationProcessor.InsertRequestRole(rid);
        }

        public bool responseRequestRoleToProject(string rid)
        {
            if (rid == "")
            {
                throw new ArgumentNullException("Data not found");
            }
            return true;
        }
    }
}

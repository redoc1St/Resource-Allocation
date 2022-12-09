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
      
        public bool requestDirectEmployeeToRolePlanning(string start_date, string end_date, int effort, int bill)
        {
            if (start_date == "" || end_date == "")
            {
                throw new ArgumentNullException("Input not null");
            }
            if(effort > 100 || bill > 100)
            {
                throw new ArgumentOutOfRangeException("%bill or %effort not more than 100%");
            }
            return resourceAllocationProcessor.InsertRequestEmployeeToRole(start_date, end_date,effort,bill);
        }

        public bool requestEmployeeToRolePlanning(string start_date, string end_date, int effort, int bill)
        {
            if (start_date == "" || end_date == "")
            {
                throw new ArgumentNullException("Input not null");
            }
            if (effort > 100 || bill > 100)
            {
                throw new ArgumentOutOfRangeException("%bill or %effort not more than 100%");
            }
            return resourceAllocationProcessor.InsertRequestEmployeeToRole(start_date, end_date, effort, bill);
        }

     
    }
}

using ResourceAllocationBE.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceAllocation.UnitTest.ResourcePoolTest
{
    public class ResourcePoolProcessor : IResourcePoolProcessor
    {
        private readonly IResourceAllocationProcessor resourceAllocationProcessor;

        public ResourcePoolProcessor(IResourceAllocationProcessor resourceAllocationProcessor)
        {
            this.resourceAllocationProcessor = resourceAllocationProcessor;
        }
       

        public bool insertResourcePool(ResourcePlanningEmployee resourcePlanningEmployee)
        {
            if (resourcePlanningEmployee.Level_id<=0 || resourcePlanningEmployee.Role_id==0)
            {
                throw new ArgumentOutOfRangeException("not positive number");
            }
            return resourceAllocationProcessor.InsertResourcePool(resourcePlanningEmployee);
        }

        public bool updateResourcePool(string start_date, string end_date, int effort, int bill)
        {
            if (start_date == "" || end_date == "")
            {
                throw new ArgumentNullException("Input not null");
            }
            if (effort > 100 || bill > 100)
            {
                throw new ArgumentOutOfRangeException("%bill or %effort not more than 100%");
            }
            return resourceAllocationProcessor.UpdateResourcePool(start_date,end_date,effort,bill);
        }
    }
}

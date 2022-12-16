using ResourceAllocationBE.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceAllocation.UnitTest.ResourcePlanningRoleTest
{
    public class ResourcePlanningRoleProcessor : IResourcePlanningRoleProcessor
    {

        private readonly IResourceAllocationProcessor resourceAllocationProcessor;

        public ResourcePlanningRoleProcessor(IResourceAllocationProcessor resourceAllocationProcessor)
        {
            this.resourceAllocationProcessor = resourceAllocationProcessor;
        }
    

    

        public bool insertResourcePlanning(ResourcePlanningRole resourcePlanningRole)
        {
            if (resourcePlanningRole.Date_start == "" || resourcePlanningRole.Date_end=="")
            {
                throw new ArgumentNullException("Input not null");
            }
            if (resourcePlanningRole.Quantity <= 0 || resourcePlanningRole.Bill_rate==0|| resourcePlanningRole.Effort_planned==0)
            {
                throw new ArgumentOutOfRangeException("Quantity not equal 0");
            }
            if (resourcePlanningRole.Bill_rate > 100 || resourcePlanningRole.Effort_planned>100)
            {
                throw new ArgumentOutOfRangeException("No more than 100%");

            }
            
            return resourceAllocationProcessor.InsertResourcePlanningRole(resourcePlanningRole);
        }

        public bool updateResourcePlanning(int quantity, int plannedEffort, int bill, string start_date, string end_date)
        {
            if (quantity <= 0)
            {
                throw new ArgumentOutOfRangeException("Quantity not equal 0");
            }
            if (plannedEffort > 100 || bill > 100)
            {
                throw new ArgumentOutOfRangeException("%bill or %effort not more than 100%");
            }
            if (start_date == "" || end_date == "")
            {
                throw new ArgumentNullException("Input not null");
            }
            return resourceAllocationProcessor.UpdateResourcePlanningRole(quantity, plannedEffort, bill,start_date,end_date);
        }

    }
}

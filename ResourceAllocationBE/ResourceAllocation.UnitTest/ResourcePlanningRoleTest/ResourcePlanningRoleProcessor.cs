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
        public bool getResourcePlanningDetail(ResourcePlanningRole resourcePlanningRole)
        {
            if(resourcePlanningRole.Id != 1)
            {
                throw new ArgumentException("Wrong id planning role");
            }
            return true;
        }

        public bool viewResourcePoolByRole(string projectName, string roleName)
        {
            if (projectName != "projectname1" || roleName!= "tester")
            {
                throw new ArgumentException("Cannot define to show resource pool");
            }
            return true;
        }
    }
}

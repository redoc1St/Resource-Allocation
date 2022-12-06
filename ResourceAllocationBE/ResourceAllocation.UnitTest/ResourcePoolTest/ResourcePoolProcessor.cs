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
        public bool getListResourcePool(string type)
        {
            if(type != "admin")
            throw new ArgumentException("Cannot see this list");
            return true;
        }

        public bool getListResourcePoolByName(string name)
        {
            return true;
        }

        public bool getListResourcePoolByRLS(string role, string levels, string skill)
        {
            if (role == "" || levels == "" || skill =="")
            {
                throw new ArgumentNullException("Cannot find employee");
            }
            return true;
        }

        public bool insertResourcePool(ResourcePlanningEmployee resourcePlanningEmployee)
        {
            if (resourcePlanningEmployee.Skill_id<=0)
            {
                throw new ArgumentOutOfRangeException("not positive number");
            }
            return resourceAllocationProcessor.InsertResourcePool(resourcePlanningEmployee);
        }

        public bool updateResourcePool(ResourcePlanningEmployee resourcePlanningEmployee)
        {
            if (resourcePlanningEmployee.Skill_id == 0)
            {
                throw new ArgumentNullException("Input not null");
            }
            return resourceAllocationProcessor.UpdateResourcePool(resourcePlanningEmployee);

        }
    }
}

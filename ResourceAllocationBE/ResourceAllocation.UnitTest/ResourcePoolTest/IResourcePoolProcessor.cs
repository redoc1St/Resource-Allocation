using System;
using ResourceAllocationBE.Model;

namespace ResourceAllocation.UnitTest.ResourcePoolTest
{
    public interface IResourcePoolProcessor
    {
        bool getListResourcePool(string type);
        bool getListResourcePoolByName(string name);
        bool getListResourcePoolByRLS(string role, string levels, string skill);
        bool updateResourcePool(ResourcePlanningEmployee resourcePlanningEmployee);
        bool insertResourcePool(ResourcePlanningEmployee resourcePlanningEmployee);
    }
}

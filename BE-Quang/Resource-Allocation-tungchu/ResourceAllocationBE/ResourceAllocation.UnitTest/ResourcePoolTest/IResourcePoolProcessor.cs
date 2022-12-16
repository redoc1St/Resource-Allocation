using System;
using ResourceAllocationBE.Model;

namespace ResourceAllocation.UnitTest.ResourcePoolTest
{
    public interface IResourcePoolProcessor
    {
        bool updateResourcePool(string start_date, string end_date, int effort, int bill);
        bool insertResourcePool(ResourcePlanningEmployee resourcePlanningEmployee);
    }
}

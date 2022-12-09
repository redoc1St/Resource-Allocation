using ResourceAllocationBE.Model;
using System;

namespace ResourceAllocation.UnitTest.ResourcePlanningRoleTest
{
    public interface IResourcePlanningRoleProcessor
    {
        bool insertResourcePlanning(ResourcePlanningRole resourcePlanningRole);
        bool updateResourcePlanning(int quantity, int plannedEffort, int bill, string start_date, string end_date);
    }
}

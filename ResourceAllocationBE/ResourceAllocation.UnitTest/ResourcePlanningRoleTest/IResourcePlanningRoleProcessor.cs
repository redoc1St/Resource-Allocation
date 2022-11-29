using ResourceAllocationBE.Model;
using System;

namespace ResourceAllocation.UnitTest.ResourcePlanningRoleTest
{
    public interface IResourcePlanningRoleProcessor
    {
        bool viewResourcePoolByRole(string projectName, string roleName);
        bool getResourcePlanningDetail(ResourcePlanningRole resourcePlanningRole);
    }
}

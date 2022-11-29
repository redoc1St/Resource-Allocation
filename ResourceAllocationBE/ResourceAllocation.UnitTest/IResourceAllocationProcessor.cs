using ResourceAllocationBE.Model;
using System;

namespace ResourceAllocation.UnitTest
{
    public interface IResourceAllocationProcessor
    {
        // User
        bool InsertUser(User user);
        bool UpdateUser(User user);

        // Project
        bool InsertProject(Project project);
        bool UpdateProject(Project project);

        // ResourcePlanningRole
        bool InsertResourcePlanningRole(ResourcePlanningRole resourcePlanningRole);
        bool UpdateResourcePlanningRole(ResourcePlanningRole resourcePlanningRole);

        // ResourcePool
        bool InsertResourcePool(ResourcePlanningEmployee resourcePlanningEmployee);
        bool UpdateResourcePool(ResourcePlanningEmployee resourcePlanningEmployee);

        // Request
        bool InsertRequest(RequestModel request);

    }
}

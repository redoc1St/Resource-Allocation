using ResourceAllocationBE.Model;
using System;

namespace ResourceAllocation.UnitTest
{
    public interface IResourceAllocationProcessor
    {
        // User
        bool InsertUser(string username, string fullname, string email, string address, string typeOfUser, string department, string bithDate, string startDate);
        bool UpdateUser(string fullname, string address);

        // Project
        bool InsertProject(Project project);
        bool UpdateProject(Project project);

        // ResourcePlanningRole
        bool InsertResourcePlanningRole(ResourcePlanningRole resourcePlanningRole);
        bool UpdateResourcePlanningRole(int quantity, int plannedEffort, int bill, string start_date, string end_date);

        // ResourcePool
        bool InsertResourcePool(ResourcePlanningEmployee resourcePlanningEmployee);
        bool UpdateResourcePool(string start_date, string end_date, int effort, int bill);

        // Request
        bool InsertRequestRole(string rid);
        bool InsertRequestEmployeeToRole(string start_date, string end_date, int effort, int bill);
        bool UpdateResourcePool(RequestModel request);
    }
}

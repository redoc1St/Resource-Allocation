using ResourceAllocationBE.Model;
using System;
using System.Collections.Generic;

namespace ResourceAllocation.UnitTest.ProjectTest
{
   public class ProjectMockData
    {
        public static List<Project> GetProjectList()
        {
            return new List<Project>{
             new Project{
                 Code="AIS_00012",
                 Department_id=1,
                 Effort_actual=1,
                 Effort_billable=1,
                 Effort_planned=1,
                 End_actual="05/05/2000",
                 End_plan="05/05/2000",
                 ProjectName="proj1",
                 Project_id=100,
                 Quantity_actual=1,
                 Quantity_plan=1,
                 Start_actual="05/05/2000",
                Start_plan="05/05/2000"

             }
         };
        }
    }
}

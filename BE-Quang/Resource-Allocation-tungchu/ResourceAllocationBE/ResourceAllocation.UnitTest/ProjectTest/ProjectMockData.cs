﻿using ResourceAllocationBE.Model;
using System;
using System.Collections.Generic;

namespace ResourceAllocation.UnitTest.ProjectTest
{
   public static class ProjectMockData
    {
        public static List<Project> GetProjectList()
        {
            return new List<Project>{
             new Project{
                 Code="AIS_00012",
                 Department_id=1,
                 Effort_billable=1,
                 End_actual="05/05/2000",
                 End_plan="05/05/2000",
                 ProjectName="proj1",
                 Project_id=100,
                 Start_actual="05/05/2000",
                Start_plan="05/05/2000"

             }
         };
        }
    }
}
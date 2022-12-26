using ResourceAllocationBE.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceAllocation.UnitTest.ProjectTest
{
    public class ProjectProcessor : IProjectProcessor
    {
        private readonly IResourceAllocationProcessor resourceAllocationProcessor;

        public ProjectProcessor(IResourceAllocationProcessor resourceAllocationProcessor)
        {
            this.resourceAllocationProcessor = resourceAllocationProcessor;
        }
       

        public bool insertProject(Project project)
        {
            if (project.ProjectName=="" || project.Start_actual=="" || project.Start_plan == "" || project.End_actual == "" || project.End_plan == "")
            {
                throw new ArgumentNullException("Input not null");
            }
            //name > 200
            // date ko dung format
            if (project.Effort_billable > 100)
            {
                throw new ArgumentOutOfRangeException("Have to less than 100%");

            }
            return resourceAllocationProcessor.InsertProject(project);
        }

   

        public bool updateProject(Project project)
        {
            if (project.ProjectName == "" || project.Start_actual == "" || project.Start_plan == "" || project.End_actual == "" || project.End_plan == "")
            {
                throw new ArgumentNullException("Input not null");
            }
            if (project.Effort_billable > 100)
            {
                throw new ArgumentOutOfRangeException("Have to less than 100%");

            }
            return resourceAllocationProcessor.UpdateProject(project);
        }
    }
}

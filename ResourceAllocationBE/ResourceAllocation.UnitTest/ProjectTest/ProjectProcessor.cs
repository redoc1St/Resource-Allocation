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
        public bool getDetailProject(Project project)
        {
            if(project.Code == "")
            {
                throw new ArgumentNullException("Can't found project");
            }
            if (project.Code != "ais_0001")
            {
                throw new ArgumentNullException("Can't found project");
            }
            return true;
        }

        public bool insertProject(Project project)
        {
            if (project.Code == "" || project.ProjectName=="")
            {
                throw new ArgumentNullException("Input not null");
            }
            if(project.Effort_planned == 0)
            {
                throw new ArgumentOutOfRangeException("Effort plan not equal 0");
            }
            if (project.Code == "ais_0001")
            {
                throw new ArgumentException("Project code had existed");
            }
            return resourceAllocationProcessor.InsertProject(project);
        }

        public bool searchProjectByName(Project project)
        {
           
            return true;
        }

        public bool updateProject(Project project)
        {
            if ( project.ProjectName == "")
            {
                throw new ArgumentNullException("Input not null");
            }
            if (project.Effort_planned == 0)
            {
                throw new ArgumentOutOfRangeException("Effort plan not equal 0");
            }
            return resourceAllocationProcessor.UpdateProject(project);
        }
    }
}

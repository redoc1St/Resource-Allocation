using Moq;
using ResourceAllocationBE.Model;
using System;
using Xunit;
namespace ResourceAllocation.UnitTest.ProjectTest
{
    public class ProjectProcessorUnitTest
    {
        


        // TEST GET PROJECT DETAIL
        [Fact]
        public void TestEmptyProjectCode()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.getDetailProject(new Project { Code = "" }));
        }
        [Fact]
        public void TestProjectCodeIsNoteTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.getDetailProject(new Project { Code = "AISSC001" }));
        }
        [Fact]
        public void TestProjectCodeIsTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.True(projectProcessor.getDetailProject(new Project { Code = "ais_0001" }));
        }

        //TEST INSERT PROJECT
        // null het
        [Fact]
        public void TestInvalidInsertProjectInputNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.insertProject(new Project { Code = "",
                ProjectName = ""
            }));
        }
        // code trống
        [Fact]
        public void TestInvalidInsertProjectInputNull2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.insertProject(new Project
            {
                Code = "",
                ProjectName = ""
            }));
        }
        // code trùng
        [Fact]
        public void TestInvalidInsertProjectInputExistedCode()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => projectProcessor.insertProject(new Project
            {
                Code = "ais_0001",
                ProjectName = "project name 1",
                Effort_planned = 50,
                Effort_actual = 50,
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
        }
        // project name trống
        [Fact]
        public void TestInvalidInsertProjectInputNameNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.insertProject(new Project
            {
                Code = "ais_0001",
                ProjectName = "",
                Effort_planned = 50,
                Effort_actual = 50,
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
        }
        // planned effort = 0
        [Fact]
        public void TestInvalidInsertProjectEffPlanMoreThan0()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.insertProject(new Project
            {
                Code = "ais_0001",
                ProjectName = "project name 1",
                Effort_planned = 0,
                Effort_actual = 50,
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
        }
        // true
        [Fact]
        public void TestValidInsertProjectReturnTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.InsertProject(It.IsAny<Project>())).Returns(true);

            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.True(projectProcessor.insertProject(new Project { Code = "ais_00012",
                ProjectName= "project name 1",
            Effort_planned=50,Effort_actual=50,Effort_billable=50,Start_plan= "05/05/2022",
                Start_actual= "05/05/2022", End_plan= "10/05/2022", End_actual= "10/05/2022"
            }));
        }

        // TEST UPDATE PROJECT
        // null
        [Fact]
        public void TestInvalidUpdateProjectInputNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();

            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.updateProject(new Project
            {
                ProjectName = ""
            }));
        }
        // project name null
        [Fact]
        public void TestInvalidUpdateProjectInputNameNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.updateProject(new Project
            {
                ProjectName = "",
                Effort_planned = 50,
                Effort_actual = 50,
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
        }
        // planned effort = 0
        [Fact]
        public void TestInvalidUpdateProjectEffPlanMoreThan0()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.updateProject(new Project
            {
                ProjectName = "projectname2",
                Effort_planned = 0,
                Effort_actual = 50,
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
        }
        // true
        [Fact]
        public void TestValidUpdateProjectReturnTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.UpdateProject(It.IsAny<Project>())).Returns(true);

            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.True(projectProcessor.updateProject(new Project
            {
                ProjectName = "projectname2",
                Effort_planned = 50,
                Effort_actual = 50,
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
        }
    }
}

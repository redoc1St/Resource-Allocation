using Moq;
using ResourceAllocationBE.Model;
using System;
using Xunit;
using Xunit.Abstractions;

namespace ResourceAllocation.UnitTest.ProjectTest
{
    public class ProjectProcessorUnitTest
    {

        private readonly ITestOutputHelper output;

        public ProjectProcessorUnitTest(ITestOutputHelper output)
        {
            this.output = output;
        }

        //TEST INSERT PROJECT
        
        // project name trống
        [Fact]
        public void TestInvalidInsertProjectInputNameNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.insertProject(new Project
            {
                ProjectName = "",
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("Input not null");
        }
        // planned effort = 0
        [Fact]
        public void TestInvalidInsertProjectProjectNameMoreThan50Character()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.insertProject(new Project
            {
                ProjectName = "project name 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("Project name is not more than 50 character");
        }
        // billable > 100%
        // planned effort = 0
        [Fact]
        public void TestInvalidInsertProjectBillableMoreThan1000()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.insertProject(new Project
            {
                ProjectName = "project name 1",
                Effort_billable = 250,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("Have to less than 100%");
        }
        // null date
        [Fact]
        public void TestInvalidInsertProjectNullDate1()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.insertProject(new Project
            {
                ProjectName = "project name 1",
                Effort_billable = 50,
                Start_plan = "",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("Input not null");
        }
        // null date
        [Fact]
        public void TestInvalidInsertProjectNullDate2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.insertProject(new Project
            {
                ProjectName = "project name 1",
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("Input not null");
        }
        // null date
        [Fact]
        public void TestInvalidInsertProjectNullDate3()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.insertProject(new Project
            {
                ProjectName = "project name 1",
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("Input not null");
        }
        // null date
        [Fact]
        public void TestInvalidInsertProjectNullDate4()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.insertProject(new Project
            {
                ProjectName = "project name 1",
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = ""
            }));
            output.WriteLine("Input not null");
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
            Effort_billable=50,Start_plan= "05/05/2022",
                Start_actual= "05/05/2022", End_plan= "10/05/2022", End_actual= "10/05/2022"
            }));
            output.WriteLine("success");
        }






        // TEST UPDATE PROJECT
        // project name null
        [Fact]
        public void TestInvalidUpdateProjectInputNameNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.updateProject(new Project
            {
                ProjectName = "",
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("Input not null");
        }
        // planned effort = 0
        [Fact]
        public void TestInvalidUpdateProjectProjectNameMoreThan50Character()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.updateProject(new Project
            {
                ProjectName = "projectname22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222",
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("Project name is not more than 50 character");
        }
        // bill > 100% 
        [Fact]
        public void TestInvalidUpdateProjectBillableMoreThan100()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => projectProcessor.updateProject(new Project
            {
                ProjectName = "projectname2",
                Effort_billable = 250,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("Have to less than 100%");
        }
        // Date null
        [Fact]
        public void TestInvalidUpdateProjectDateNull1()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.updateProject(new Project
            {
                ProjectName = "projectname2",
                Effort_billable = 50,
                Start_plan = "",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("Input not null");
        }
        // Date null
        [Fact]
        public void TestInvalidUpdateProjectDateNull2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.updateProject(new Project
            {
                ProjectName = "projectname2",
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("Input not null");
        }
        // Date null
        [Fact]
        public void TestInvalidUpdateProjectDateNull3()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.updateProject(new Project
            {
                ProjectName = "projectname2",
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("Input not null");
        }
        // Date null
        [Fact]
        public void TestInvalidUpdateProjectDateNull4()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var projectProcessor = new ProjectProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => projectProcessor.updateProject(new Project
            {
                ProjectName = "projectname2",
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = ""
            }));
            output.WriteLine("Input not null");
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
                Effort_billable = 50,
                Start_plan = "05/05/2022",
                Start_actual = "05/05/2022",
                End_plan = "10/05/2022",
                End_actual = "10/05/2022"
            }));
            output.WriteLine("success");
        }
    }
}

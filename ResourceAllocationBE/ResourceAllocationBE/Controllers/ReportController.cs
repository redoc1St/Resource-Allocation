using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ResourceAllocationBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ReportController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        //report Emp
        [HttpGet("Employee")]
        public JsonResult getListReportResourceAllocation()
        {
            string query = @"
                    select number = ROW_NUMBER() OVER (ORDER BY ResourcePlanning_Employee.id),[User].[User_id], ResourcePlanning_Employee.id, [User].Fullname,  Roles.RoleName,skill.skill_id, Roles.Role_id, levels.level_id,Department.Department_id, Levels.LevelName, Skill.SkillName,
                    Project.ProjectName, Emp_RolePlanning.Date_start, [user].Username,
                    Emp_RolePlanning.Date_end, Effort,Emp_RolePlanning.Bill_rate, Department.Department_name
					,emp_RolePlanning.Employee_id,emp_RolePlanning.ResourcePlannig_RoleId
                    from ResourcePlanning_Employee
		            join [User]  on [User].[User_id]  = ResourcePlanning_Employee.Employee_id
		            join Roles on Roles.Role_id = ResourcePlanning_Employee.Role_id 
		            join Levels on Levels.Level_id = ResourcePlanning_Employee.Level_id
		            join Skill on Skill.Skill_id = ResourcePlanning_Employee.Skill_id
		            join Department on Department.Department_id = [user].Department_id
					left join Emp_RolePlanning on Emp_RolePlanning.Employee_id = ResourcePlanning_Employee.id
					left join ResourcePlanning_Role on ResourcePlanning_Role.id = Emp_RolePlanning.ResourcePlannig_RoleId
left join Project on Project.Project_id = ResourcePlanning_Role.project_id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
    }
}

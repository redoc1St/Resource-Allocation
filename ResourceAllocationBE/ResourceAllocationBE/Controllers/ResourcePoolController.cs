
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ResourceAllocationBE.Model;
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
    public class ResourcePoolController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ResourcePoolController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //ADMIN
        //LOAD LIST RESOURCE POOL
        [HttpGet]
        public JsonResult getListResourcePool(string pid)
        {
           
            string query = @"
                    select number = ROW_NUMBER() OVER (ORDER BY ResourcePlanning_Employee.id),[User].[User_id], ResourcePlanning_Employee.id, [User].Fullname,  Roles.RoleName,skill.skill_id, Roles.Role_id, levels.level_id,Department.Department_id, Levels.LevelName, Skill.SkillName,
                    Project.ProjectName, Emp_RolePlanning.Date_start, [user].Username,
                    Emp_RolePlanning.Date_end, Effort,Emp_RolePlanning.Bill_rate, Department.Department_name
					,emp_RolePlanning.Employee_id,emp_RolePlanning.ResourcePlannig_RoleId
					,effortColumn.totalEffort, effortColumn.totalBill
                    from ResourcePlanning_Employee
		            join [User]  on [User].[User_id]  = ResourcePlanning_Employee.Employee_id
		            join Roles on Roles.Role_id = ResourcePlanning_Employee.Role_id 
		            join Levels on Levels.Level_id = ResourcePlanning_Employee.Level_id
		            join Skill on Skill.Skill_id = ResourcePlanning_Employee.Skill_id
		            join Department on Department.Department_id = [user].Department_id
					left join Emp_RolePlanning on Emp_RolePlanning.Employee_id = ResourcePlanning_Employee.id
					left join ResourcePlanning_Role on ResourcePlanning_Role.id = Emp_RolePlanning.ResourcePlannig_RoleId
					left join Project on Project.Project_id = ResourcePlanning_Role.project_id
					left join	(select Employee_id,sum(Effort) as totalEffort , sum(Bill_rate) as totalBill  from Emp_RolePlanning group by Employee_id) as effortColumn 
					on ResourcePlanning_Employee.id = effortColumn.Employee_id
                    where [user].isActive = 1
                    order by Department_name asc, fullname asc";
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
        //LOAD LIST RESOURCE POOL By BU
        [HttpGet("bu/{bu}")]
        public JsonResult GetListResourcePoolByBU(int bu)
        {
            string query = @"
                      select number = ROW_NUMBER() OVER (ORDER BY ResourcePlanning_Employee.id),[User].[User_id], ResourcePlanning_Employee.id, [User].Fullname,  Roles.RoleName,skill.skill_id, Roles.Role_id, levels.level_id,Department.Department_id, Levels.LevelName, Skill.SkillName,
                    Project.ProjectName, Emp_RolePlanning.Date_start, [user].Username,
                    Emp_RolePlanning.Date_end, Effort,Emp_RolePlanning.Bill_rate, Department.Department_name
					,emp_RolePlanning.Employee_id,emp_RolePlanning.ResourcePlannig_RoleId
					,effortColumn.totalEffort, effortColumn.totalBill
                    from ResourcePlanning_Employee
		            join [User]  on [User].[User_id]  = ResourcePlanning_Employee.Employee_id
		            join Roles on Roles.Role_id = ResourcePlanning_Employee.Role_id 
		            join Levels on Levels.Level_id = ResourcePlanning_Employee.Level_id
		            join Skill on Skill.Skill_id = ResourcePlanning_Employee.Skill_id
		            join Department on Department.Department_id = [user].Department_id
					left join Emp_RolePlanning on Emp_RolePlanning.Employee_id = ResourcePlanning_Employee.id
					left join ResourcePlanning_Role on ResourcePlanning_Role.id = Emp_RolePlanning.ResourcePlannig_RoleId
					left join Project on Project.Project_id = ResourcePlanning_Role.project_id
					left join	(select Employee_id,sum(Effort) as totalEffort , sum(Bill_rate) as totalBill  from Emp_RolePlanning group by Employee_id) as effortColumn 
					on ResourcePlanning_Employee.id = effortColumn.Employee_id
                    where Department.Department_id=@bu and [user].isActive = 1
order by Department_name asc, fullname asc";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@bu", bu);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }

        //LOAD LIST RESOURCE POOL
        [HttpGet("search/{name}")]
        public JsonResult getListResourcePoolByName(string name)
        {
            string query = @"
                select number = ROW_NUMBER() OVER (ORDER BY ResourcePlanning_Employee.id),[User].[User_id], ResourcePlanning_Employee.id, [User].Fullname,  Roles.RoleName,skill.skill_id, Roles.Role_id, levels.level_id,Department.Department_id, Levels.LevelName, Skill.SkillName,
                    Project.ProjectName, Emp_RolePlanning.Date_start, [user].Username,
                    Emp_RolePlanning.Date_end, Effort,Emp_RolePlanning.Bill_rate, Department.Department_name
					,emp_RolePlanning.Employee_id,emp_RolePlanning.ResourcePlannig_RoleId
					,effortColumn.totalEffort, effortColumn.totalBill
                    from ResourcePlanning_Employee
		            join [User]  on [User].[User_id]  = ResourcePlanning_Employee.Employee_id
		            join Roles on Roles.Role_id = ResourcePlanning_Employee.Role_id 
		            join Levels on Levels.Level_id = ResourcePlanning_Employee.Level_id
		            join Skill on Skill.Skill_id = ResourcePlanning_Employee.Skill_id
		            join Department on Department.Department_id = [user].Department_id
					left join Emp_RolePlanning on Emp_RolePlanning.Employee_id = ResourcePlanning_Employee.id
					left join ResourcePlanning_Role on ResourcePlanning_Role.id = Emp_RolePlanning.ResourcePlannig_RoleId
					left join Project on Project.Project_id = ResourcePlanning_Role.project_id
					left join	(select Employee_id,sum(Effort) as totalEffort , sum(Bill_rate) as totalBill  from Emp_RolePlanning group by Employee_id) as effortColumn 
					on ResourcePlanning_Employee.id = effortColumn.Employee_id
                where [User].Fullname like @name and [user].isActive = 1
order by Department_name asc, fullname asc";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", '%' + name + '%');
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }

        //List by role, level, skill
        [HttpGet("{role}/{level}/{skill}")]
        public JsonResult getListResourcePoolByRLS( int role, int level, int skill)
        {
            string query = @"
                    select number = ROW_NUMBER() OVER (ORDER BY ResourcePlanning_Employee.id),[User].[User_id], ResourcePlanning_Employee.id, [User].Fullname,  Roles.RoleName,skill.skill_id, Roles.Role_id, levels.level_id,Department.Department_id, Levels.LevelName, Skill.SkillName,
                    Project.ProjectName, Emp_RolePlanning.Date_start, [user].Username,
                    Emp_RolePlanning.Date_end, Effort,Emp_RolePlanning.Bill_rate, Department.Department_name
					,emp_RolePlanning.Employee_id,emp_RolePlanning.ResourcePlannig_RoleId
					,effortColumn.totalEffort
                    from ResourcePlanning_Employee
		            join [User]  on [User].[User_id]  = ResourcePlanning_Employee.Employee_id
		            join Roles on Roles.Role_id = ResourcePlanning_Employee.Role_id 
		            join Levels on Levels.Level_id = ResourcePlanning_Employee.Level_id
		            join Skill on Skill.Skill_id = ResourcePlanning_Employee.Skill_id
		            join Department on Department.Department_id = [user].Department_id
					left join Emp_RolePlanning on Emp_RolePlanning.Employee_id = ResourcePlanning_Employee.id
					left join ResourcePlanning_Role on ResourcePlanning_Role.id = Emp_RolePlanning.ResourcePlannig_RoleId
                    left join Project on Project.Project_id = ResourcePlanning_Role.project_id
                    left join	(select Employee_id,sum(Effort) as totalEffort from Emp_RolePlanning group by Employee_id) as effortColumn 
					on ResourcePlanning_Employee.id = effortColumn.Employee_id
                    where Roles.Role_id = @role and Levels.Level_id between @level and 5 and Skill.Skill_id =@skill  
                    and [user].isActive = 1
order by Department_name asc, fullname asc";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@role", role);
                    myCommand.Parameters.AddWithValue("@level", level);
                    myCommand.Parameters.AddWithValue("@skill", skill);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }


        // LEADER


        //INSERT IN TO DB
        [HttpPost]
        public JsonResult insertResourcePool(ResourcePlanningEmployee resource)
        {
            string query = @" if not exists ( select * from [ResourcePlanning_Employee] where Role_id = @Role_id and Level_id =@Level_id and Skill_id =@Skill_id and Employee_id = @Employee_id )
                insert into [ResourcePlanning_Employee](Employee_id,Role_id,Level_id,Skill_id) 
                values(@Employee_id
                ,@Role_id
                ,@Level_id
                ,@Skill_id)    else
				select * from [user] ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Employee_id", resource.Employee_id);
                    myCommand.Parameters.AddWithValue("@Role_id", resource.Role_id);
                    myCommand.Parameters.AddWithValue("@Level_id", resource.Level_id);
                    myCommand.Parameters.AddWithValue("@Skill_id", resource.Skill_id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            if (table.Rows.Count > 0)
            {
                return new JsonResult("FAILS");
            }
            return new JsonResult("Added Successfully");
        }


        //UPDATE IN TO DB
        [HttpPut("update")]
        public JsonResult UpdateResourcePool(RequestModel request)
        {
            string query = @"
                 update dbo.Emp_RolePlanning
                set [Date_start] = @Date_start,
                [Date_end] = @Date_end,
                [Effort]=@Effort,
                [Bill_rate]=@Bill_rate
                WHERE [ResourcePlannig_RoleId] = @rid and [Employee_id]=@eid";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@rid", request.resourceRole_id);
                    myCommand.Parameters.AddWithValue("@eid", request.employee_id);
                    myCommand.Parameters.AddWithValue("@Date_start", request.Date_start);
                    myCommand.Parameters.AddWithValue("@Date_end", request.Date_end);
                    myCommand.Parameters.AddWithValue("@Effort", request.Effort);
                    myCommand.Parameters.AddWithValue("@Bill_rate", request.Bill_rate);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Update Successfully");
        }



    }

}

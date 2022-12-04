﻿using Microsoft.AspNetCore.Http;
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

        //LOAD LIST RESOURCE POOL
        [HttpGet]
        public JsonResult GetListResourcePool(string pid)
        {
            string query = @"
                      select number = ROW_NUMBER() OVER (ORDER BY ResourcePlanning_Employee.id),[User].[User_id], ResourcePlanning_Employee.id, [User].Fullname,  Roles.RoleName,skill.skill_id, Roles.Role_id, levels.level_id,Department.Department_id, Levels.LevelName, Skill.SkillName,
                    Project.ProjectName, ResourcePlanning_Employee.Date_start, [user].Username,
                    ResourcePlanning_Employee.Date_end, Effort,ResourcePlanning_Employee.Bill_rate, Department.Department_name
					,emp_RolePlanning.Employee_id
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

        //LOAD LIST RESOURCE POOL By BU
        [HttpGet("bu/{bu}")]
        public JsonResult GetListResourcePoolByBU(int bu)
        {
            string query = @"
                       select number = ROW_NUMBER() OVER (ORDER BY ResourcePlanning_Employee.id),[User].[User_id], ResourcePlanning_Employee.id, [User].Fullname,  Roles.RoleName,skill.skill_id, Roles.Role_id, levels.level_id,Department.Department_id, Levels.LevelName, Skill.SkillName,
                    Project.ProjectName, ResourcePlanning_Employee.Date_start, [user].Username,
                    ResourcePlanning_Employee.Date_end, Effort,ResourcePlanning_Employee.Bill_rate, Department.Department_name
					,emp_RolePlanning.Employee_id
                    from ResourcePlanning_Employee
		            join [User]  on [User].[User_id]  = ResourcePlanning_Employee.Employee_id
		            join Roles on Roles.Role_id = ResourcePlanning_Employee.Role_id 
		            join Levels on Levels.Level_id = ResourcePlanning_Employee.Level_id
		            join Skill on Skill.Skill_id = ResourcePlanning_Employee.Skill_id
		            join Department on Department.Department_id = [user].Department_id
					left join Emp_RolePlanning on Emp_RolePlanning.Employee_id = ResourcePlanning_Employee.id
					left join ResourcePlanning_Role on ResourcePlanning_Role.id = Emp_RolePlanning.ResourcePlannig_RoleId
                    left join Project on Project.Project_id = ResourcePlanning_Role.project_id where Department.Department_id=@bu";
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
        public JsonResult GetListResourcePoolByName(string name)
        {
            string query = @"
                select ResourcePlanning_Employee.id, [User].Fullname, Roles.RoleName, Levels.LevelName, Skill.SkillName,
                Project.ProjectName, ResourcePlanning_Employee.Date_start, 
                ResourcePlanning_Employee.Date_end, Effort,ResourcePlanning_Employee.Bill_rate, Department.Department_name
                from ResourcePlanning_Employee
		            join [User]  on [User].[User_id]  = ResourcePlanning_Employee.Employee_id
		            join Roles on Roles.Role_id = ResourcePlanning_Employee.Role_id 
		            join Levels on Levels.Level_id = ResourcePlanning_Employee.Level_id
		            join Skill on Skill.Skill_id = ResourcePlanning_Employee.Skill_id
                    left join Project on Project.Project_id = ResourcePlanning_Employee.project_id
		            join Department on Department.Department_id = [user].Department_id
                and [User].Fullname like @name";
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
        public JsonResult GetListResourcePoolByMany(int role, int level, int skill)
        {
            string query = @"
                     select number = ROW_NUMBER() OVER (ORDER BY ResourcePlanning_Employee.id),[User].[User_id], ResourcePlanning_Employee.id, [User].Fullname,  Roles.RoleName,skill.skill_id, Roles.Role_id, levels.level_id,Department.Department_id, Levels.LevelName, Skill.SkillName,
                    Project.ProjectName, ResourcePlanning_Employee.Date_start, [user].Username,
                    ResourcePlanning_Employee.Date_end, Effort,ResourcePlanning_Employee.Bill_rate, Department.Department_name
					,emp_RolePlanning.Employee_id
                    from ResourcePlanning_Employee
		            join [User]  on [User].[User_id]  = ResourcePlanning_Employee.Employee_id
		            join Roles on Roles.Role_id = ResourcePlanning_Employee.Role_id 
		            join Levels on Levels.Level_id = ResourcePlanning_Employee.Level_id
		            join Skill on Skill.Skill_id = ResourcePlanning_Employee.Skill_id
		            join Department on Department.Department_id = [user].Department_id
					left join Emp_RolePlanning on Emp_RolePlanning.Employee_id = ResourcePlanning_Employee.id
					left join ResourcePlanning_Role on ResourcePlanning_Role.id = Emp_RolePlanning.ResourcePlannig_RoleId
                    left join Project on Project.Project_id = ResourcePlanning_Role.project_id
                    where Roles.Role_id = @role and Levels.Level_id =@level and Skill.Skill_id =@skill ";
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

        //INSERT IN TO DB
        [HttpPost]
        public JsonResult insertResourcePool(ResourcePlanningEmployee resource)
        {
            string query = @" if not exists ( select * from [ResourcePlanning_Employee] where Role_id = @Role_id and Level_id =@Level_id and Skill_id =@Skill_id and Employee_id = @Employee_id )
                insert into [ResourcePlanning_Employee](Employee_id,Role_id,Date_start, Date_end, Effort, Bill_rate,Level_id,Skill_id, Project_id) 
                values(@Employee_id
                ,@Role_id
                ,@Date_start
                ,@Date_end
                ,@Effort
                ,@Bill_rate
                ,@Level_id
                ,@Skill_id,
                @project_id) ";
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
                    myCommand.Parameters.AddWithValue("@Date_start", resource.Date_start);
                    myCommand.Parameters.AddWithValue("@Date_end", resource.Date_end);
                    myCommand.Parameters.AddWithValue("@Effort", resource.Effort);
                    myCommand.Parameters.AddWithValue("@Bill_rate", resource.Bill_rate);
                    myCommand.Parameters.AddWithValue("@Level_id", resource.Level_id);
                    myCommand.Parameters.AddWithValue("@Skill_id", resource.Skill_id);
                    myCommand.Parameters.AddWithValue("@project_id", resource.Project_id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Added Successfully");
        }


        //UPDATE IN TO DB
        [HttpPut("update/{id}")]
        public JsonResult UpdateResourcePool(ResourcePlanningEmployee resource, int id)
        {
            string query = @"
                 update dbo.ResourcePlanning_Employee
                set [Date_start] = @Date_start,
                [Date_end] = @Date_end,
                [Effort]=@Effort,
                [Bill_rate]=@Bill_rate
                WHERE [id] = @id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@Date_start", resource.Date_start);
                    myCommand.Parameters.AddWithValue("@Date_end", resource.Date_end);
                    myCommand.Parameters.AddWithValue("@Effort", resource.Effort);
                    myCommand.Parameters.AddWithValue("@Bill_rate", resource.Bill_rate);

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
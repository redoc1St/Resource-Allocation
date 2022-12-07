using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ResourceAllocationBE.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ResourceAllocationBE.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class ExtraObjectController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ExtraObjectController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("getuser")]
        public IActionResult GetUser()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Ok(userId);
        }

        //ROLES
        [HttpGet]
        [Route("api/roles")]
        public JsonResult GetListRole()
        {
            string query = @"
                               select * from
                                dbo.[Roles]";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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
        //Levels
        [HttpGet]
        [Route("api/levels")]
        public JsonResult GetListLevels()
        {
            string query = @"
                               select * from
                                dbo.[Levels]";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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

        //Skill
        [HttpGet]
        [Route("api/skills")]
        public JsonResult GetListSkillss()
        {
            string query = @"
                               select * from
                                dbo.[Skill]";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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

        
        //INSERT IN TO DB User_role
        [Route("api/add/User_role")]
        [HttpPost]
        public JsonResult addUserRole(User_Role user_role)
        {
            string query = @"insert into User_Role values(@role_id, @user_id)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@role_id", user_role.Role_id);
                    myCommand.Parameters.AddWithValue("@user_id", user_role.User_id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        //INSERT IN TO DB addEmp_Role
        [Route("api/add/Emp_Role/{role}/{level}/{skill}")]
        [HttpPost]
        public JsonResult addEmp_Role(ResourcePlanningRole resource, int role, int level, int skill)
        {
            string query = @"
            if not exists(select * from Emp_RolePlanning, ResourcePlanning_Role 
            where Emp_RolePlanning.ResourcePlannig_RoleId = ResourcePlanning_Role.id
            and Emp_RolePlanning.Employee_id = @emp_id and Role_id=@role and Level_id =@level and Skill_id=@skill and Project_id=@projectid)
            insert into Emp_RolePlanning values (@resourcePid,@emp_id)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@resourcePid", resource.Id);
                    myCommand.Parameters.AddWithValue("@emp_id", resource.Employee_id);
                    myCommand.Parameters.AddWithValue("@role", role);
                    myCommand.Parameters.AddWithValue("@level", level);
                    myCommand.Parameters.AddWithValue("@skill", skill);
                    myCommand.Parameters.AddWithValue("@projectid", resource.Project_id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }


        // SHOW ALL LEADER 

        //get projectId by code 
        [HttpGet]
        [Route("api/{code}")]

        public JsonResult GetPidByCode(string code)
        {
            string query = @"SELECT [Project_id],[ProjectName],Depeartment_id  FROM Project WHERE [Code]=@code";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@code", code);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }

        // SHOW  LEADER  INFOR

        [HttpGet]
        [Route("api/leader/{code}")]
        public JsonResult GetLeaderInfor(string code)
        {
            string query = @"SELECT TOP (1000) [User_id]
                        ,[Username]
                        ,[Password]
      ,[Fullname]
      ,[Email]
      ,[Address]
      ,[UserType]
      ,[isActive]
      ,[BirthDay]
      ,[Start_Day]
      ,[Department_id],
	  code
  FROM [ResourceAllocationDB_2].[dbo].[User], Project
  where Project.Depeartment_id = [user].Department_id and code = @code and UserType ='leader'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@code", code);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }

        // Lay projectName theo RLS => lay rid ADMIN
[HttpGet]
        [Route("api/getPnameByRLS/{role_id}/{level_id}/{skill_id}")]
        public JsonResult GetListPnameByRLS(string role_id, string level_id, string skill_id)
        {
            string query = @"
        select * from ResourcePlanning_Role
        
        join Project on Project.Project_id = ResourcePlanning_Role.project_id

        join Skill on Skill.Skill_id = ResourcePlanning_Role.Skill_id

        join Levels on Levels.Level_id = ResourcePlanning_Role.Level_id

        join Roles on roles.Role_id = ResourcePlanning_Role.Role_id

        where roles.Role_id= @role_id and Levels.Level_id= @level_id and Skill.Skill_id= @skill_id";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@role_id", role_id);
                    myCommand.Parameters.AddWithValue("@level_id", level_id);
                    myCommand.Parameters.AddWithValue("@skill_id", skill_id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        // Lay projectName theo RLS => lay rid LEADER
[HttpGet]
        [Route("api/getPnameForLeaderByRLS/{role_id}/{level_id}/{skill_id}/{bu_id}")]
        public JsonResult GetListPnameForLeaderByRLS(int role_id, int level_id, int skill_id,int bu_id)
        {
            string query = @"
        select * from ResourcePlanning_Role
        
        join Project on Project.Project_id = ResourcePlanning_Role.project_id

        join Skill on Skill.Skill_id = ResourcePlanning_Role.Skill_id

        join Levels on Levels.Level_id = ResourcePlanning_Role.Level_id

        join Roles on roles.Role_id = ResourcePlanning_Role.Role_id

        where roles.Role_id= @role_id and Levels.Level_id= @level_id and Skill.Skill_id= @skill_id and Depeartment_id=@bu_id";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@role_id", role_id != null ? role_id : "");
                    myCommand.Parameters.AddWithValue("@level_id", level_id != null ? level_id : "");
                    myCommand.Parameters.AddWithValue("@skill_id", skill_id != null ? skill_id : "");
                    myCommand.Parameters.AddWithValue("@bu_id", bu_id!=null ? bu_id :"" );

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        // Lay id theo RLSCode => lay rid 
        [HttpGet]
        [Route("api/getPnameByRLS/{code}/{role_id}/{level_id}/{skill_id}")]
        public JsonResult GetIdByRLSCode(string role_id, string level_id, string skill_id, string code)
        {
            string query = @"
        select * from ResourcePlanning_Role
        
        join Project on Project.Project_id = ResourcePlanning_Role.project_id

        join Skill on Skill.Skill_id = ResourcePlanning_Role.Skill_id

        join Levels on Levels.Level_id = ResourcePlanning_Role.Level_id

        join Roles on roles.Role_id = ResourcePlanning_Role.Role_id

        where Code=@code and roles.Role_id= @role_id and Levels.Level_id= @level_id and Skill.Skill_id= @skill_id";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@code", code);
                    myCommand.Parameters.AddWithValue("@role_id", role_id);
                    myCommand.Parameters.AddWithValue("@level_id", level_id);
                    myCommand.Parameters.AddWithValue("@skill_id", skill_id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        // SHOW  LEADER  INFOR  DEPARTMENT ID
        [HttpGet]
        [Route("api/leaderByBU/{bu}")]
        public JsonResult getLeaderInforByBu(int bu)
        {
            string query = @"SELECT *
        FROM [ResourceAllocationDB_2].[dbo].[User]
        where Department_id = @bu and UserType ='leader'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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
    }
}

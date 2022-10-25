using Microsoft.AspNetCore.Http;
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
    //[Route("api/[controller]")]
    [ApiController]
    public class ExtraObjectController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ExtraObjectController(IConfiguration configuration)
        {
            _configuration = configuration;
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
        //Levels
        [HttpGet]
        [Route("api/levels")]
        public JsonResult GetListLevels()
        {
            string query = @"
                               select * from
                                dbo.[Levels]";
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

        //Skill
        [HttpGet]
        [Route("api/skills")]
        public JsonResult GetListSkillss()
        {
            string query = @"
                               select * from
                                dbo.[Skill]";
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

        
        //INSERT IN TO DB User_role
        [Route("api/add/User_role")]
        [HttpPost]
        public JsonResult addUserRole(User_Role user_role)
        {
            string query = @"insert into User_Role values(@role_id, @user_id)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
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
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
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
    }
}

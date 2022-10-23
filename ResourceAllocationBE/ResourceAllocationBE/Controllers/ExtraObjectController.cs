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

        
    }
}

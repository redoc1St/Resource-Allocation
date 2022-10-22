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
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //login
        [HttpPost("login")]
        public JsonResult Login(User user)
        {
            string query = @"
                            select * from [User] where email = @Email and Password = @password";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Email", user.Email);
                    myCommand.Parameters.AddWithValue("@password", user.Password);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Login Successfully");
        }

        //LOAD LIST USER
        [HttpGet]
        public JsonResult GetListUser()
        {
            string query = @"
                               select * from
                                dbo.[User] where UserType != 'admin' ";
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

        //LOAD LIST USER by active
        [HttpGet("list/{isActive}")]
        public JsonResult GetListUserByActive(string isActive)
        {
            string query = @"
                               select * from
                                dbo.[User] where UserType != 'admin' and [isActive] = @isActive";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@isActive", isActive);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }

        //SEARCH USER BY NAME
        [HttpGet("search/{name}/{isactive}")]
        public JsonResult SearchByName(string name,string isactive)
        {
            string query = @"
                               select * from
                                dbo.[User] where [Username] like @UName and [isActive] = @isactive";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UName", '%' + name + '%');
                    myCommand.Parameters.AddWithValue("@isactive", isactive);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }

         
        //PAGING  LIST USER
        [HttpGet("page/{number}")]
        public JsonResult Paging(int number)
        {
            string query = @"
                                       select * from
                                        dbo.[User] order by [User_id] OFFSET @from Rows fetch next 4 rows only";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@from", (number - 1) * 4+1);
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
        public JsonResult CreateNewUser(User user)
        {
            string query = @"insert into [User] values(
        @Username, @Password,
@Fullname,@Email,
@Address,@UserType,
@isActive,@BirthDay,
@Start_Day,@Department_id)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Username", user.Username);
                    myCommand.Parameters.AddWithValue("@Password", user.Password);
                    myCommand.Parameters.AddWithValue("@Fullname", user.Fullname);
                    myCommand.Parameters.AddWithValue("@Email", user.Email);
                    myCommand.Parameters.AddWithValue("@Address", user.Address);
                    myCommand.Parameters.AddWithValue("@UserType", user.UserType);
                    myCommand.Parameters.AddWithValue("@isActive", user.isActive);
                    myCommand.Parameters.AddWithValue("@BirthDay", user.BirthDay);
                    myCommand.Parameters.AddWithValue("@Start_Day", user.Start_Day);
                    myCommand.Parameters.AddWithValue("@Department_id", user.Department_id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Added Successfully");
        }


        //UPDATE INTO DB
        [HttpPut("{id}")]
        public JsonResult Put(User user, int id)
        {
            string query = @"update dbo.[User]
        set [Username] = @Username, [Password]= @Password, 
[Fullname] = @Fullname, [Email] = @Email,
[Address]=@Address, [UserType]=@UserType, 
[isActive]=@isActive, [BirthDay]=@BirthDay, 
[Start_Day]=@Start_Day, [Department_id]=@Department_id
WHERE [User_id] = @id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@Username", user.Username);
                    myCommand.Parameters.AddWithValue("@Password", user.Password);
                    myCommand.Parameters.AddWithValue("@Fullname", user.Fullname);
                    myCommand.Parameters.AddWithValue("@Email", user.Email);
                    myCommand.Parameters.AddWithValue("@Address", user.Address);
                    myCommand.Parameters.AddWithValue("@UserType", user.UserType);
                    myCommand.Parameters.AddWithValue("@isActive", user.isActive);
                    myCommand.Parameters.AddWithValue("@BirthDay", user.BirthDay);
                    myCommand.Parameters.AddWithValue("@Start_Day", user.Start_Day);
                    myCommand.Parameters.AddWithValue("@Department_id", user.Department_id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Update Successfully");
        }


        //Get Detail PROJECT
        [HttpGet("{id}")]
        public JsonResult GetDetail(string id)
        {
            string query = @"select *  from [User] where [User_id] =@Uid";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Uid", id);
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

﻿using Microsoft.AspNetCore.Authorization;
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
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IJwtTokenManager _tokenManager;
        public UserController(IJwtTokenManager jwtTokenManager, IConfiguration configuration)
        {
            _configuration = configuration;
            _tokenManager = jwtTokenManager;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult LoginA(User user)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                SqlDataAdapter da = new SqlDataAdapter("select * from [User] where email = '" + user.Email + "' and Password = '" + user.Password + "' and isActive=1", myCon);
                myCon.Open();
                da.Fill(table);
                if (table.Rows.Count > 0)
                {
                    var token = _tokenManager.Authenticate(user.Email, user.Password);
                    return Ok(token);
                }
                return Unauthorized();
            }
        }

        //LOAD LIST USER
        [HttpGet]
        public JsonResult GetListUser()
        {
            string query = @"
                               select * from
                                dbo.[User] where UserType != 'admin' ";
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
        //LOAD LIST USER BY BU
        [HttpGet("{bu}")]
        public JsonResult GetListUserByBU(int bu)
        {
            string query = @"
                               select * from
                                dbo.[User] where UserType != 'admin' and  UserType != 'leader'  and department_id=@bu and isActive =1";
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
        //LOAD LIST USER to add employee role
        [HttpGet("employee")]
        public JsonResult getListUserEmployee()
        {
            string query = @"
                               select * from
                                dbo.[User] where UserType != 'admin' and UserType != 'leader'  and isActive =1 ";
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

        //LOAD LIST USER by active
        [HttpGet("list/{isActive}")]
        public JsonResult GetListUserByActive(string isActive)
        {
            string query = @"
                               select * from
                                dbo.[User] where UserType != 'admin' and [isActive] = @isActive";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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
        [HttpGet("search/{name}")]
        public JsonResult SearchByNameOnly(string name,string isactive)
        {
            string query = @"
                               select * from
                                dbo.[User] where UserType != 'admin' and  [Fullname] like @name ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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
        //SEARCH USER BY NAME
        [HttpGet("search/{name}/{isactive}")]
        public JsonResult SearchByName(string name, string isactive)
        {
            string query = @"
                               select * from
                                dbo.[User] where [Fullname] like @UName and [isActive] = @isactive and UserType != 'admin'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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
        [HttpGet("getuser")]
        public JsonResult GetDetail()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            string query = @"select *  from [User] where [email] =@Uid";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Uid", userId!=null ? userId : "");
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }
        //CHANGE PASSWORD 
        [HttpPut("changePass/{id}")]
        public JsonResult changePass(User user, int id)
        {
            string query = @"update dbo.[User]
        set [Password]= @Password
        WHERE [User_id] = @id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@Password", user.Password);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Update Successfully");
        }

        [HttpPost("createUser")]
        public JsonResult createNewUser([FromForm] MailRequest request, User user)
        {

            string query = @"
        if not exists(select * from [User] where email = @Email)
        insert into [User] values(
        @Username, @Password,
        @Fullname,@Email,
        @Address,@UserType,
        @isActive,@BirthDay,
        @Start_Day,@Department_id)
        else
        select * from [user]";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Username", user.Username);
                    myCommand.Parameters.AddWithValue("@Password", "");
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
            if (table.Rows.Count > 0)
            {
                return new JsonResult("FAILS");
            }
            return new JsonResult("Added Successfully");
        }

    }
}
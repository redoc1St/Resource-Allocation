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
using System.Threading.Tasks;

namespace ResourceAllocationBE.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProjectController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //LOAD LIST PROJECTS
        //[Authorize]
        [HttpGet]
        public JsonResult getListProject()
        {
            string query = @"
                               select * from
                                dbo.[Project] order by Project_id desc";
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
        //LOAD LIST PROJECTS BY BU FOR LEADER 
        //[Authorize]
        [HttpGet("bu/{bu}")]
        public JsonResult getListProjectByBu(int bu)
        {
            string query = @"
                               select * from
                                dbo.[Project] where depeartment_id=@bu order by Project_id desc";
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

        //SEARCH BY NAME
        [HttpGet("search/{name}")]
        public JsonResult searchProjectByName(string name)
        {
            string query = @"
                               select * from
                                dbo.[Project] where [ProjectName] like @PName order by Project_id desc";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PName", '%' + name + '%');
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }

       
        //SEARCH BY NAME AND BU
        [HttpGet("search/bu/{name}/{bu}")]
        public JsonResult searchProjectByBuName(string name, int bu)
        {
            string query = @"
                               select * from
                                dbo.[Project] where [ProjectName] like @PName and depeartment_id=@bu";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PName", '%' + name + '%');
                    myCommand.Parameters.AddWithValue("@bu", bu);

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
        //[EnableCors("SpecificOrigin")]

        public JsonResult insertProject(Project project)
        {
            string query = @"
        if not exists ( select * from Project where Code = @Code)
        insert into Project values(
        @Code, @ProjectName,
        @Depeartment_id,@Effort_planned,
        @Effort_actual,@Effort_billable,
        @Start_plan,@Start_actual,
        @End_plan,@End_actual,
@note)
        else
        select * from [user]
";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Code", project.Code == null ? "" : project.Code);
                    myCommand.Parameters.AddWithValue("@ProjectName", project.ProjectName == null ? "" : project.ProjectName);
                    myCommand.Parameters.AddWithValue("@Depeartment_id", project.Department_id);
                    myCommand.Parameters.AddWithValue("@Effort_planned", project.Effort_planned);
                    myCommand.Parameters.AddWithValue("@Effort_actual", project.Effort_actual);
                    myCommand.Parameters.AddWithValue("@Effort_billable", project.Effort_billable);
                    myCommand.Parameters.AddWithValue("@Start_plan", project.Start_plan == null ? "GETDATE()" : project.Start_plan);
                    myCommand.Parameters.AddWithValue("@Start_actual", project.Start_actual == null ? "GETDATE()" : project.Start_actual);
                    myCommand.Parameters.AddWithValue("@End_plan", project.End_plan == null ? "GETDATE()" : project.End_plan);
                    myCommand.Parameters.AddWithValue("@End_actual", project.End_actual == null ? "GETDATE()" : project.End_actual);
                    myCommand.Parameters.AddWithValue("@note", project.Note == null ? "" : project.Note);

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
        [HttpPut("{id}")]
        public JsonResult updateProject(Project project, int id)
        {
            string query = @"
            update dbo.Project set Code = @Code, ProjectName= @ProjectName, Depeartment_id = @Depeartment_id,
            Effort_planned = @Effort_planned,Effort_actual=@Effort_actual,
            Effort_billable=@Effort_billable,  Start_plan=@Start_plan,
            Start_actual=@Start_actual, End_plan=@End_plan, End_actual=@End_actual
            WHERE [Project_id] = @id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@Code", project.Code);
                    myCommand.Parameters.AddWithValue("@ProjectName", project.ProjectName);
                    myCommand.Parameters.AddWithValue("@Depeartment_id", project.Department_id);
                    myCommand.Parameters.AddWithValue("@Effort_planned", project.Effort_planned);
                    myCommand.Parameters.AddWithValue("@Effort_actual", project.Effort_actual);
                    myCommand.Parameters.AddWithValue("@Effort_billable", project.Effort_billable);
                    myCommand.Parameters.AddWithValue("@Start_plan", project.Start_plan == null ? "GETDATE()" : project.Start_plan);
                    myCommand.Parameters.AddWithValue("@Start_actual", project.Start_actual == null ? "GETDATE()" : project.Start_actual);
                    myCommand.Parameters.AddWithValue("@End_plan", project.End_plan == null ? "GETDATE()" : project.End_plan);
                    myCommand.Parameters.AddWithValue("@End_actual", project.End_actual == null ? "GETDATE()" : project.End_actual);

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
        public JsonResult getDetailProject(string id)
        {
            string query = @"select *  from Project where [Code] =@Pid";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Pid", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }

        //UPDATE NOTE IN TO DB
        [HttpPut("Note/{id}")]
        public JsonResult updateNoteProject(Project project, int id)
        {
            string query = @"
            update dbo.Project set note = @note
            WHERE [Project_id] = @id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@note", project.Note);
                   
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

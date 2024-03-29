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
    public class ProjectController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProjectController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //LOAD LIST PROJECTS
        [HttpGet]
        public JsonResult GetListProject()
        {
            string query = @"
                               select * from
                                dbo.[Project]";
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


        //SEARCH BY NAME
        [HttpGet("search/{name}")]
        public JsonResult SearchByName(string name)
        {
            string query = @"
                               select * from
                                dbo.[Project] where [ProjectName] like @PName";
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

        //PAGING 
        [HttpGet("page/{number}")]

        public JsonResult Paging(int number)
        {
            string query = @"
                                       select * from
                                        dbo.Project order by [Project_id] OFFSET @from Rows fetch next 4 rows only";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@from", (number - 1) * 4);
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

        public JsonResult Post(Project project)
        {
            string query = @"insert into Project values(
        @Code, @ProjectName,
@Depeartment_id,@Effort_planned,
@Effort_actual,@Effort_billable,
@Quantity_plan,@Quantity_actual,
@Start_plan,@Start_actual,
@End_plan,@End_actual)";
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
                    myCommand.Parameters.AddWithValue("@Quantity_plan", project.Quantity_plan);
                    myCommand.Parameters.AddWithValue("@Quantity_actual", project.Quantity_actual);
                    myCommand.Parameters.AddWithValue("@Start_plan", project.Start_plan == null ? "" : project.Start_plan);
                    myCommand.Parameters.AddWithValue("@Start_actual", project.Start_actual == null ? "" : project.Start_actual);
                    myCommand.Parameters.AddWithValue("@End_plan", project.End_plan == null ? "" : project.End_plan);
                    myCommand.Parameters.AddWithValue("@End_actual", project.End_actual == null ? "" : project.End_actual);


                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Added Successfully");
        }





        //UPDATE IN TO DB
        [HttpPut("{id}")]
        public JsonResult Put(Project project, int id)
        {
            string query = @"update dbo.Project
        set Code = @Code, ProjectName= @ProjectName, Depeartment_id = @Depeartment_id,
Effort_planned = @Effort_planned,Effort_actual=@Effort_actual,
Effort_billable=@Effort_billable, Quantity_plan=@Quantity_plan, 
Quantity_actual=@Quantity_actual, Start_plan=@Start_plan,
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
                    myCommand.Parameters.AddWithValue("@Quantity_plan", project.Quantity_plan);
                    myCommand.Parameters.AddWithValue("@Quantity_actual", project.Quantity_actual);
                    myCommand.Parameters.AddWithValue("@Start_plan", project.Start_plan == null ? "" : project.Start_plan);
                    myCommand.Parameters.AddWithValue("@Start_actual", project.Start_actual == null ? "" : project.Start_actual);
                    myCommand.Parameters.AddWithValue("@End_plan", project.End_plan == null ? "" : project.End_plan);
                    myCommand.Parameters.AddWithValue("@End_actual", project.End_actual == null ? "" : project.End_actual);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Update Successfully");
        }

        //Delete IN DB
        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            string query = @"
                    delete from dbo.Project
                                    where [Code] = @Pid";
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
            return new JsonResult("Delete Successfully");
        }


        //Get Detail PROJECT
        [HttpGet("{id}")]
        public JsonResult GetDetail(string id)
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
    }
}

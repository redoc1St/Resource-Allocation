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
    public class ResourcePlanningController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ResourcePlanningController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //LOAD LIST ResourcePlanning
        [HttpGet("{pid}")]
        public JsonResult GetListResourcePlanning(string pid)
        {
            string query = @"
                              select id,Roles.RoleName, ProjectName, [User].Fullname,
Quantity, Date_start, Date_end, ResourcePlanning_Role.Effort_planned,
ResourcePlanning_Role.Effort_actual, Bill_rate, [Status], 
LevelName, SkillName
from ResourcePlanning_Role, Roles,Project, [user], Levels,Skill
where ResourcePlanning_Role.Project_id = Project.Project_id and
Roles.Role_id = ResourcePlanning_Role.Role_id and
ResourcePlanning_Role.Employee_id = [User].[User_id] 
and ResourcePlanning_Role.Level_id = Levels.Level_id and
ResourcePlanning_Role.Skill_id =  Skill.Skill_id
and Project.code = @pid";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@pid", pid);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }


        //SUA
        //--select RESOURCEPOOL by ROLE
        [HttpGet("view/{name}")]
        public JsonResult ViewResourcePoolByRole(string name)
        {
            string query = @"
                               select ResourcePlanning_Employee.id, [User].Fullname, Roles.RoleName, Levels.LevelName, Skill.SkillName,
Project.ProjectName, ResourcePlanning_Employee.Date_start, 
ResourcePlanning_Employee.Date_end, Effort,ResourcePlanning_Employee.Bill_rate, Department.Department_name
from ResourcePlanning_Employee, [User], Roles, User_Role, Levels, Skill, 
Project, ResourcePlanning_Role, Department
where ResourcePlanning_Employee.Employee_id = [User].[User_id] and

[User].[User_id] = User_Role.[User_id] and
User_Role.Role_id = Roles.Role_id and
[User].Department_id = Department.Department_id and

ResourcePlanning_Employee.Level_id = Levels.Level_id AND

Skill.Skill_id = ResourcePlanning_Employee.Skill_id and

Project.Project_id = ResourcePlanning_Role.Project_id and
ResourcePlanning_Role.Employee_id =ResourcePlanning_Employee.Employee_id
and RoleName = @name";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", name);
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
                                        dbo.ResourcePlanning_Role order by [id] OFFSET @from Rows fetch next 4 rows only";
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

        //Get Detail PROJECT
        [HttpGet("one/{id}")]
        public JsonResult GetDetail(string id)
        {
            string query = @"select *  from ResourcePlanning_Role where [id] =@id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
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
        public JsonResult Post(ResourcePlanningRole resource)
        {
            string query = @"insert into [ResourcePlanning_Role] values(
                @Project_id, @Role_id,
        @Employee_id,@Quantity,
        @Date_start,@Date_end,
        @Effort_planned,@Effort_actual,
        @Bill_rate,@Level_id,
        @Skill_id,
        @Status)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Project_id", resource.Project_id);
                    myCommand.Parameters.AddWithValue("@Role_id", resource.Role_id);
                    myCommand.Parameters.AddWithValue("@Employee_id", resource.Employee_id);
                    myCommand.Parameters.AddWithValue("@Quantity", resource.Quantity);
                    myCommand.Parameters.AddWithValue("@Date_start", resource.Date_start);
                    myCommand.Parameters.AddWithValue("@Date_end", resource.Date_end);
                    myCommand.Parameters.AddWithValue("@Effort_planned", resource.Effort_planned);
                    myCommand.Parameters.AddWithValue("@Effort_actual", resource.Effort_actual);
                    myCommand.Parameters.AddWithValue("@Bill_rate", resource.Bill_rate);
                    myCommand.Parameters.AddWithValue("@Level_id", resource.Level_id);
                    myCommand.Parameters.AddWithValue("@Level_id", resource.Skill_id);
                    myCommand.Parameters.AddWithValue("@Status", resource.Status);


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
        public JsonResult Put(ResourcePlanningRole resource, int id)
        {
            string query = @"update dbo.ResourcePlanning_Role
                set Project_id = @Project_id, Role_id= @Role_id, Employee_id = @Employee_id,
        Quantity = @Quantity,Date_start=@Date_start,
        Date_end=@Date_end, Effort_planned=@Effort_planned, 
        Effort_actual=@Effort_actual, Bill_rate=@Bill_rate,
        Level_id=@Level_id, Skill_id=@Skill_id , Status=@Status
        WHERE id = @id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@Project_id", resource.Project_id);
                    myCommand.Parameters.AddWithValue("@Role_id", resource.Role_id);
                    myCommand.Parameters.AddWithValue("@Employee_id", resource.Employee_id);
                    myCommand.Parameters.AddWithValue("@Quantity", resource.Quantity);
                    myCommand.Parameters.AddWithValue("@Date_start", resource.Date_start);
                    myCommand.Parameters.AddWithValue("@Date_end", resource.Date_end);
                    myCommand.Parameters.AddWithValue("@Effort_planned", resource.Effort_planned);
                    myCommand.Parameters.AddWithValue("@Effort_actual", resource.Effort_actual);
                    myCommand.Parameters.AddWithValue("@Bill_rate", resource.Bill_rate);
                    myCommand.Parameters.AddWithValue("@Level_id", resource.Level_id);
                    myCommand.Parameters.AddWithValue("@Skill_id", resource.Skill_id);
                    myCommand.Parameters.AddWithValue("@Status", resource.Status);

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
                    delete from dbo.ResourcePlanning_Role
                                    where [id] = @id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Delete Successfully");
        }


        
    }
}

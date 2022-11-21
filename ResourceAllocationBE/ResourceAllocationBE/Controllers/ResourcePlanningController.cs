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
                    select id,Roles.RoleName, ProjectName, Roles.Role_id, 
                    Quantity, Date_start, Date_end, ResourcePlanning_Role.Effort_planned,
                    ResourcePlanning_Role.Effort_actual, Bill_rate, [Status], 
                    LevelName, SkillName, Skill.Skill_id, Levels.Level_id
                    from ResourcePlanning_Role, Roles,Project, Levels,Skill
                    where ResourcePlanning_Role.Project_id = Project.Project_id and
                    Roles.Role_id = ResourcePlanning_Role.Role_id and
                    ResourcePlanning_Role.Level_id = Levels.Level_id and
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


        //--select RESOURCEPOOL by projectname and role
        [HttpGet("view/{name}/{role}")]
        public JsonResult ViewResourcePoolByRole(string name, string role)
        {
            string query = @"
             SELECT [User].Fullname, 
                Roles.RoleName, 
                ResourcePlanning_Role.Date_start, 
                ResourcePlanning_Role.Date_end, 
                ResourcePlanning_Role.Effort_planned, 
                ResourcePlanning_Role.Bill_rate, 
                Levels.LevelName, 
                Skill.SkillName
               
             FROM Project, ResourcePlanning_Role, [USER], Roles, 
                Levels, Skill, ResourcePlanning_Employee, Emp_RolePlanning
                
             WHERE			Project.Project_id = ResourcePlanning_Role.Project_id AND
                ResourcePlanning_Role.id =  Emp_RolePlanning.ResourcePlannig_RoleId and
				Emp_RolePlanning.Employee_id = ResourcePlanning_Employee.id and
				ResourcePlanning_Employee.Employee_id=[USER].[User_id] AND 
                Roles.Role_id = ResourcePlanning_Role.Role_id AND
                Levels.Level_id = ResourcePlanning_Role.Level_id AND
                Skill.Skill_id = ResourcePlanning_Role.Skill_id
                and ProjectName =@name AND Roles.RoleName = @role";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", name);
                    myCommand.Parameters.AddWithValue("@role", role);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }

        //Get Detail ResourcePlanning_Role
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

        //INSERT ResourcePlanningRole
        [HttpPost]
        public JsonResult Post(ResourcePlanningRole resource)
        {
            string query = @"
            if not exists ( select * from ResourcePlanning_Role where Role_id = @Role_id and Level_id =@Level_id and Skill_id =@Skill_id and  Project_id=@Project_id)
            insert into [ResourcePlanning_Role](Project_id,Role_id,Quantity,Date_start ,
            Date_end ,
            Effort_planned ,
            Effort_actual ,
            Bill_rate ,
            Level_id,
            Skill_id,[Status]) values(
                @Project_id, @Role_id,
                @Quantity,
                @Date_start,@Date_end,
                @Effort_planned,@Effort_actual,
                @Bill_rate,@Level_id,
                @Skill_id,
                'Waiting'
                )";
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
                    myCommand.Parameters.AddWithValue("@Quantity", resource.Quantity);
                    myCommand.Parameters.AddWithValue("@Date_start", resource.Date_start == null ? "GETDATE()" : resource.Date_start);
                    myCommand.Parameters.AddWithValue("@Date_end", resource.Date_end == null ? "GETDATE()" : resource.Date_end);
                    myCommand.Parameters.AddWithValue("@Effort_planned", resource.Effort_planned);
                    myCommand.Parameters.AddWithValue("@Effort_actual", resource.Effort_actual);
                    myCommand.Parameters.AddWithValue("@Bill_rate", resource.Bill_rate);
                    myCommand.Parameters.AddWithValue("@Level_id", resource.Level_id);
                    myCommand.Parameters.AddWithValue("@Skill_id", resource.Skill_id);
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
            string query = @"
                if not exists ( select * from ResourcePlanning_Role where Role_id = @Role_id and Level_id =@Level_id and Skill_id =@Skill_id and  Project_id=@Project_id)
                update dbo.ResourcePlanning_Role
                set  
                Quantity=@Quantity,
                Date_start=@Date_start,
                Date_end=@Date_end, 
                Effort_planned=@Effort_planned, 
                Bill_rate=@Bill_rate,
                Level_id=@Level_id, 
                Skill_id=@Skill_id 
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
                    myCommand.Parameters.AddWithValue("@Quantity", resource.Quantity);
                    myCommand.Parameters.AddWithValue("@Date_start", resource.Date_start == null ? "GETDATE()" : resource.Date_start);
                    myCommand.Parameters.AddWithValue("@Date_end", resource.Date_end == null ? "GETDATE()" : resource.Date_end);
                    myCommand.Parameters.AddWithValue("@Effort_planned", resource.Effort_planned);
                    myCommand.Parameters.AddWithValue("@Bill_rate", resource.Bill_rate);
                    myCommand.Parameters.AddWithValue("@Level_id", resource.Level_id);
                    myCommand.Parameters.AddWithValue("@Skill_id", resource.Skill_id);
                    myCommand.Parameters.AddWithValue("@Role_id", resource.Role_id);
                    myCommand.Parameters.AddWithValue("@Project_id", resource.Project_id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Update Successfully");
        }

        ////Delete IN DB
        //[HttpDelete("{id}")]
        //public JsonResult Delete(string id)
        //{
        //    string query = @"
        //            delete from dbo.ResourcePlanning_Role
        //                            where [id] = @id";
        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
        //    SqlDataReader myReader;
        //    using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        //    {
        //        myCon.Open();
        //        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        //        {
        //            myCommand.Parameters.AddWithValue("@id", id);
        //            myReader = myCommand.ExecuteReader();
        //            table.Load(myReader);
        //            myReader.Close();
        //            myCon.Close();

        //        }
        //    }
        //    return new JsonResult("Delete Successfully");
        //}

        ////UPDATE STATUS
        //[HttpPut("status/{id}")]
        //public JsonResult updateStatus(ResourcePlanningRole resource, int id)
        //{
        //    string query = @"
        //        update dbo.ResourcePlanning_Role
        //        set  
        //        [Status]=@status
        //        WHERE id = @id";
        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
        //    SqlDataReader myReader;
        //    using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        //    {
        //        myCon.Open();
        //        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        //        {
        //            myCommand.Parameters.AddWithValue("@id", id);
        //            myCommand.Parameters.AddWithValue("@status", resource.Status);
        //            myReader = myCommand.ExecuteReader();
        //            table.Load(myReader);
        //            myReader.Close();
        //            myCon.Close();

        //        }
        //    }
        //    return new JsonResult("Update Successfully");
        //}
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


       // REQUEST

    }
}

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
    public class RequestController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RequestController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Request to ResourceRole Planning (Existed in Project)
        [HttpPost("RolePlanning")]
        public JsonResult RequestToRolePlanning(RequestModel request)
        {
            string query = @"
            insert into ResourceRequestRole values(@rid,2,'')
            update ResourcePlanning_Role set [Status] = 'In Progress' where id = @rid
                ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@rid", request.resourceRole_id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        //ShOW All request ResourcePlanning
        [HttpGet("RolePlanning")]
        public JsonResult GetListResourcePlanning()
        {
            string query = @"
                    select *
                    from ResourcePlanning_Role, Roles,Project, Levels,Skill, ResourceRequestRole
                    where ResourcePlanning_Role.Project_id = Project.Project_id and
                    Roles.Role_id = ResourcePlanning_Role.Role_id and
                    ResourcePlanning_Role.Level_id = Levels.Level_id and
                    ResourcePlanning_Role.Skill_id =  Skill.Skill_id and
                    ResourceRequestRole.ResourcePlannig_RoleId = ResourcePlanning_Role.id";
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

        // Request to ResourceRole Planning (Not Existed in Project)

        // SHOW REQUEST BY BU (Leader Project can see)

        // REQUEST EMPLOYEE TO ROLE PLANNING (KHAC BU)(Existed and Approved in Project) (CHUA XONG)
        [HttpPost("EmpToRole")]
        public JsonResult requestEmployeeToRolePlanning(RequestModel request)
        {
            //if not exists(select * from[ResourceRequestEmployee] where ResourcePlannig_RoleId = @rid and Employee_id = @eid)
            //and not exists(select * from Emp_RolePlanning where ResourcePlannig_RoleId = 5 and Employee_id = 2)
            string query = @"
            insert into ResourceRequestEmployee values(
            @rid,@eid,2,'','waiting')
                ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@rid", request.resourceRole_id);
                    myCommand.Parameters.AddWithValue("@eid", request.employee_id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        //APPROVED REQUEST EMPLOYEE -> insert vao emprole, update status o bang requestEmp
        [HttpPost("EmpToRole/approved")]
        public JsonResult approvedRequestEmp(RequestModel request)
        {
            string query = @"
            insert into Emp_RolePlanning values(@rid,@eid)
            update ResourceRequestEmployee set [status] = 'Approved' where ResourcePlannig_RoleId =@rid and Employee_id = @eid";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@rid", request.resourceRole_id);
                    myCommand.Parameters.AddWithValue("@eid", request.employee_id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("APPROVED Successfully");
        }
        // REQUEST EMPLOYEE TO ROLE PLANNING (cung BU)

        // SHOW ALL EMPLOYEE REQEUST  (chua xong) 
        [HttpGet("Employee")]
        public JsonResult getListRequestEmp()
        {
            string query = @"
                    select  *
                    from ResourceRequestEmployee";
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
        // SHOW EMPLOYEE REQEUST (CUNG BU) ()

    }
}

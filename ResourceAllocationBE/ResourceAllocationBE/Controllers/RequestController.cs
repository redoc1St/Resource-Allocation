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
            insert into ResourceRequestRole values(@rid,2,'',GETDATE())
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

        //APPROVE ROLE TO PROJECT
        //[HttpPost("RolePlanning/approved")]
        //public JsonResult approvedRequestRoleToProject(RequestModel request)
        //{
        //    string query = @"
        //    update ResourcePlanning_Role set [status] = 'Approved' where id =@rid";
        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
        //    SqlDataReader myReader;
        //    using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        //    {
        //        myCon.Open();
        //        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        //        {
        //            myCommand.Parameters.AddWithValue("@rid", request.resourceRole_id);
        //            myReader = myCommand.ExecuteReader();
        //            table.Load(myReader);
        //            myReader.Close();
        //            myCon.Close();
        //        }
        //    }
        //    return new JsonResult("APPROVED Successfully");
        //}

        //// REJECT ROLE TO PROJECT 
        //[HttpPost("RolePlanning/reject")]
        //public JsonResult rejectdRequestRoleToProject(RequestModel request)
        //{
        //    string query = @"
        //    update ResourcePlanning_Role set [status] = 'Reject' where id =@rid";
        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
        //    SqlDataReader myReader;
        //    using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        //    {
        //        myCon.Open();
        //        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        //        {
        //            myCommand.Parameters.AddWithValue("@rid", request.resourceRole_id);
        //            myReader = myCommand.ExecuteReader();
        //            table.Load(myReader);
        //            myReader.Close();
        //            myCon.Close();
        //        }
        //    }
        //    return new JsonResult("APPROVED Successfully");
        //}


        // APPROVED AND REJECT  ROLE TO PROJECT 
        [HttpPost("RolePlanning/{status}")]
        public JsonResult statusRequestRoleToProject(RequestModel request, string status)
        {
            string query = @"
            update ResourcePlanning_Role set [status] = @status where id =@rid
            insert into Notifications values (12, 'De nghi Role cua ban da duoc @status', GETDATE())
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
                    myCommand.Parameters.AddWithValue("@status", status);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(" Successfully");
        }
        // Request to ResourceRole Planning (Not Existed in Project)

        // SHOW REQUEST BY BU (Leader Project can see)

        // REQUEST EMPLOYEE TO ROLE PLANNING (KHAC BU)(Existed and Approved in Project) 
        [HttpPost("EmpToRole")]
        public JsonResult requestEmployeeToRolePlanning(RequestModel request)
        {
            //if not exists(select * from[ResourceRequestEmployee] where ResourcePlannig_RoleId = @rid and Employee_id = @eid)
            //and not exists(select * from Emp_RolePlanning where ResourcePlannig_RoleId = 5 and Employee_id = 2)
            string query = @"
            insert into ResourceRequestEmployee values(
            @rid,@eid,2,'','In Progress',GETDATE())
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
        //[HttpPost("EmpToRole/approved")]
        //public JsonResult approvedRequestEmp(RequestModel request)
        //{
        //    string query = @"
        //    insert into Emp_RolePlanning values(@rid,@eid)
        //    update ResourceRequestEmployee set [status] = 'Approved' where ResourcePlannig_RoleId =@rid and Employee_id = @eid";
        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
        //    SqlDataReader myReader;
        //    using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        //    {
        //        myCon.Open();
        //        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        //        {
        //            myCommand.Parameters.AddWithValue("@rid", request.resourceRole_id);
        //            myCommand.Parameters.AddWithValue("@eid", request.employee_id);
        //            myReader = myCommand.ExecuteReader();
        //            table.Load(myReader);
        //            myReader.Close();
        //            myCon.Close();
        //        }
        //    }
        //    return new JsonResult("APPROVED Successfully");
        //}

        //APPROVED / REJECT REQUEST EMPLOYEE -> insert vao emprole, update status o bang requestEmp
        [HttpPost("EmpToRole/{status}")]
        public JsonResult statusRequestEmp(RequestModel request, string status)
        {
            string query = @"
            insert into Emp_RolePlanning values(@rid,@eid)
            update ResourceRequestEmployee set [status] = @status where ResourcePlannig_RoleId =@rid and Employee_id = @eid
             insert into Notifications values (12, 'De nghi Employee cua ban da duoc @status', GETDATE())";
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
                    myCommand.Parameters.AddWithValue("@status", status);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(" Successfully");
        }


        // REQUEST truc tiep  EMPLOYEE TO ROLE PLANNING (cung BU)
        [HttpPost("EmpToRoleDirect")]
        public JsonResult requestDirectEmployeeToRolePlanning(RequestModel request)
        {
            //if not exists(select * from[ResourceRequestEmployee] where ResourcePlannig_RoleId = @rid and Employee_id = @eid)
            //and not exists(select * from Emp_RolePlanning where ResourcePlannig_RoleId = 5 and Employee_id = 2)
            string query = @"
             insert into Emp_RolePlanning values(@rid,@eid)
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


        // SHOW ALL EMPLOYEE REQEUST  
        [HttpGet("Employee")]
        public JsonResult getListRequestEmp()
        {
            string query = @"
                    SELECT *
                    FROM [ResourceRequestEmployee] 
                    join ResourcePlanning_Employee on ResourceRequestEmployee.Employee_id = ResourcePlanning_Employee.id
                    join [User] on [user].[User_id] = ResourcePlanning_Employee.Employee_id
                    join Roles on ResourcePlanning_Employee.Role_id = Roles.Role_id
                    join Department on Department.Department_id = [user].Department_id
                    join Project on Project.project_id = ResourcePlanning_Employee.[project_id]
                    join skill on skill.skill_id=resourceplanning_employee.skill_id
  ";
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

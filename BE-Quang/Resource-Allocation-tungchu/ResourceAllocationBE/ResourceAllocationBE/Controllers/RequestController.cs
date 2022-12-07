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
        [HttpPost("RolePlanning/Noti/{user_id}")]
        public JsonResult requestToRolePlanning(RequestModel request, int user_id)
        {
            string query = @"
            insert into ResourceRequestRole values(@rid,2,'',GETDATE())
            update ResourcePlanning_Role set [Status] = 'In Progress' where id = @rid
            insert into Notifications values (@id, 'You get notification abour  request....', GETDATE())
                ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@rid", request.resourceRole_id);
                    myCommand.Parameters.AddWithValue("@id", user_id);
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
        public JsonResult getListRequestResourcePlanning()
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

        //APPROVE ROLE TO PROJECT
        //[HttpPost("RolePlanning/approved")]
        //public JsonResult approvedRequestRoleToProject(RequestModel request)
        //{
        //    string query = @"
        //    update ResourcePlanning_Role set [status] = 'Approved' where id =@rid";
        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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
        //    string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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
        public JsonResult responseRequestRoleToProject(RequestModel request, string status)
        {
            string query = @"
            update ResourcePlanning_Role set [status] = @status where id =@rid
            insert into Notifications values (1, 'De nghi Role cua ban da duoc @status', GETDATE())
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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

        // SHOW REQUEST role BY BU (Leader Project can see)
        [HttpGet("RolePlanning/{bu}")]
        public JsonResult getListRequestResourcePlanningByBU(int bu)
        {
            string query = @"
                    select *
                    from ResourcePlanning_Role, Roles,Project, Levels,Skill, ResourceRequestRole
                    where ResourcePlanning_Role.Project_id = Project.Project_id and
                    Roles.Role_id = ResourcePlanning_Role.Role_id and
                    ResourcePlanning_Role.Level_id = Levels.Level_id and
                    ResourcePlanning_Role.Skill_id =  Skill.Skill_id and
                    ResourceRequestRole.ResourcePlannig_RoleId = ResourcePlanning_Role.id and depeartment_id =@bu";
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


        //APPROVED REQUEST EMPLOYEE -> insert vao emprole, update status o bang requestEmp
        //[HttpPost("EmpToRole/approved")]
        //public JsonResult approvedRequestEmp(RequestModel request)
        //{
        //    string query = @"
        //    insert into Emp_RolePlanning values(@rid,@eid)
        //    update ResourceRequestEmployee set [status] = 'Approved' where ResourcePlannig_RoleId =@rid and Employee_id = @eid";
        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
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

        //APPROVED REQUEST EMPLOYEE -> insert vao emprole, update status o bang requestEmp
        [HttpPost("EmpToRole/Approved/Noti/{user_id}")]
        public JsonResult approveRequestEmp(RequestModel request, int user_id)
        {
            string query = @"
 if not exists (select * from Emp_RolePlanning where ResourcePlannig_RoleId =@rid and Employee_id = @eid)
			begin	
            insert into Emp_RolePlanning values(@rid,@eid, @date_start,@date_end, @effort, @bill)
            update ResourceRequestEmployee set [status] = 'Approved' where ResourcePlannig_RoleId =@rid and Employee_id = @eid
            insert into Notifications values (1, 'De nghi REQUEST Employee cua ban da duoc Approved', GETDATE())
insert into Notifications values (@user_id, 'Ban da duoc approved vao ...', GETDATE())
end
else select * from [user]";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@rid", request.resourceRole_id);
                    myCommand.Parameters.AddWithValue("@eid", request.employee_id);
                    myCommand.Parameters.AddWithValue("@date_start", request.Date_start);
                    myCommand.Parameters.AddWithValue("@date_end", request.Date_end);
                    myCommand.Parameters.AddWithValue("@effort", request.Effort);
                    myCommand.Parameters.AddWithValue("@bill", request.Bill_rate);
                    myCommand.Parameters.AddWithValue("@user_id", user_id);
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
            return new JsonResult(" Successfully");
        }
        //REJECT REQUEST EMPLOYEE -> insert vao emprole, update status o bang requestEmp
        [HttpPost("EmpToRole/Reject/Noti/{user_id}")]
        public JsonResult rejectRequestEmp(RequestModel request, int user_id)
        {
            string query = @"
            update ResourceRequestEmployee set [status] = 'Reject' where ResourcePlannig_RoleId =@rid and Employee_id = @eid
            insert into Notifications values (1, 'De nghi Employee cua ban da duoc Reject', GETDATE())
insert into Notifications values (@user_id, 'Ban khong duoc chap nhan vao  ...', GETDATE())";

            
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@rid", request.resourceRole_id);
                    myCommand.Parameters.AddWithValue("@eid", request.employee_id);
                    myCommand.Parameters.AddWithValue("@user_id", user_id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(" Successfully");
        }

        // REQUEST EMPLOYEE TO ROLE PLANNING (KHAC BU)(Existed and Approved in Project)
        // insert into Notifications values (@id, 'You get notification about request employee....', GETDATE())

        [HttpPost("EmpToRole/noti/{leader_id}")]
        public JsonResult requestEmployeeToRolePlanning(RequestModel request,int leader_id)
        {
            string query = @"
            	  if not exists(SELECT * FROM [ResourceRequestEmployee]
                where  ResourcePlannig_RoleId =@rid and Employee_id = @eid and 
				(status='In Progress' or status='Approved'))
			begin 
			insert into ResourceRequestEmployee values(@rid,@eid,2,@leader_id,'In Progress',GETDATE(), @date_start,@date_end, @effort, @bill)
                insert into Notifications values (@leader_id, 'LEADER You get notification about request employee....', GETDATE())
			end
			else 
			select * from [user]
                ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@rid", request?.resourceRole_id);
                    myCommand.Parameters.AddWithValue("@eid", request?.employee_id);

                    myCommand.Parameters.AddWithValue("@date_start", request.Date_start);
                    myCommand.Parameters.AddWithValue("@date_end", request.Date_end);
                    myCommand.Parameters.AddWithValue("@effort", request.Effort);
                    myCommand.Parameters.AddWithValue("@bill", request.Bill_rate);
                    myCommand.Parameters.AddWithValue("@leader_id", leader_id);

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
        // REQUEST truc tiep  EMPLOYEE TO ROLE PLANNING (cung BU)
        [HttpPost("EmpToRoleDirect/Noti/{leader_id}/{user_id}")]
        public JsonResult requestDirectEmployeeToRolePlanning(RequestModel request, int user_id, int leader_id)
        {
            string query = @"
                if not exists(SELECT * FROM Project, ResourcePlanning_Role, [USER], Roles, Levels, Skill, ResourcePlanning_Employee, Emp_RolePlanning
                WHERE Project.Project_id = ResourcePlanning_Role.Project_id AND
                ResourcePlanning_Role.id = Emp_RolePlanning.ResourcePlannig_RoleId and
                Emp_RolePlanning.Employee_id = ResourcePlanning_Employee.id and
                ResourcePlanning_Employee.Employee_id =[USER].[User_id] AND
                Roles.Role_id = ResourcePlanning_Role.Role_id AND
                Levels.Level_id = ResourcePlanning_Role.Level_id AND
                Skill.Skill_id = ResourcePlanning_Role.Skill_id
               AND ResourcePlanning_Role.id = @rid and ResourcePlanning_Employee.id = @eid)
            begin  insert into Emp_RolePlanning values(@rid,@eid,@date_start,@date_end, @effort, @bill)
            insert into Notifications values (@leader_id, 'LEADER You get notification about request employee....', GETDATE())
            insert into Notifications values (@user_id, 'EMPLOYEE You get notification about request employee....', GETDATE())
            end
                else
				select * from [user]
                ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@rid", request.resourceRole_id);
                    myCommand.Parameters.AddWithValue("@eid", request.employee_id);

                    myCommand.Parameters.AddWithValue("@date_start", request.Date_start);
                    myCommand.Parameters.AddWithValue("@date_end", request.Date_end);
                    myCommand.Parameters.AddWithValue("@effort", request.Effort);
                    myCommand.Parameters.AddWithValue("@bill", request.Bill_rate);
                    myCommand.Parameters.AddWithValue("@leader_id", leader_id);
                    myCommand.Parameters.AddWithValue("@user_id", user_id);
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


        // SHOW ALL EMPLOYEE REQEUST  
        [HttpGet("Employee")]
        public JsonResult getListRequestEmployee()
        {
            string query = @"
                   SELECT *
                    FROM [ResourceRequestEmployee] 
                    join ResourcePlanning_Employee on ResourceRequestEmployee.Employee_id = ResourcePlanning_Employee.id
                    join [User] on [user].[User_id] = ResourcePlanning_Employee.Employee_id
                    join Roles on ResourcePlanning_Employee.Role_id = Roles.Role_id
                    join Department on Department.Department_id = [user].Department_id
					join ResourcePlanning_Role on ResourcePlanning_Role.id = ResourceRequestEmployee.ResourcePlannig_RoleId
                    join Project on Project.project_id = ResourcePlanning_Role.[project_id]
                    join skill on skill.skill_id=resourceplanning_employee.skill_id
  ";
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
        // SHOW EMPLOYEE REQEUST (CUNG BU) ()
        [HttpGet("Employee/{bu}")]
        public JsonResult getListRequestEmployeeBU(int bu )
        {
            string query = @"
                   SELECT *
                    FROM [ResourceRequestEmployee] 
                    join ResourcePlanning_Employee on ResourceRequestEmployee.Employee_id = ResourcePlanning_Employee.id
                    join [User] on [user].[User_id] = ResourcePlanning_Employee.Employee_id
                    join Roles on ResourcePlanning_Employee.Role_id = Roles.Role_id
                    join Department on Department.Department_id = [user].Department_id
					join ResourcePlanning_Role on ResourcePlanning_Role.id = ResourceRequestEmployee.ResourcePlannig_RoleId
                    join Project on Project.project_id = ResourcePlanning_Role.[project_id]
                    join skill on skill.skill_id=resourceplanning_employee.skill_id
	                 where Department.Department_id =@bu

                ";
            //project.depeartment_id=@bu
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
    }
}
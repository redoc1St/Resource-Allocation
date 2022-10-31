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
            insert into ResourceRequest values(@rid,1,2,'')
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
        [HttpGet("RolePlanning/{type}")]
        public JsonResult GetListResourcePlanning(int type)
        {
            string query = @"
                    select *
                    from ResourcePlanning_Role, Roles,Project, Levels,Skill, ResourceRequest
                    where ResourcePlanning_Role.Project_id = Project.Project_id and
                    Roles.Role_id = ResourcePlanning_Role.Role_id and
                    ResourcePlanning_Role.Level_id = Levels.Level_id and
                    ResourcePlanning_Role.Skill_id =  Skill.Skill_id and
                    ResourceRequest.ResourcePlannig_RoleId = ResourcePlanning_Role.id
                    and [Type]  = @type";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@type", type);
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

        // REQUEST EMPLOYEE TO ROLE PLANNING (KHAC BU)

        // SHOW EMPLOYEE REQEUST (CUNG BU)
    }
}

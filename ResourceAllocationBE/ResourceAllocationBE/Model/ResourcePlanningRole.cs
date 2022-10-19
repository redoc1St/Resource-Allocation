using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResourceAllocationBE.Model
{
    public class ResourcePlanningRole
    {
        public int Id { get; set; }
        public int Project_id { get; set; }
        public int Role_id { get; set; }
        public int Employee_id { get; set; }
        public int Quantity { get; set; }
        public string Date_start { get; set; }
        public string Date_end { get; set; }
        public int Effort_planned { get; set; }
        public int Effort_actual { get; set; }
        public int Bill_rate { get; set; }
        public int Level_id { get; set; }
        public int Skill_id { get; set; }
        public string Status { get; set; }

    }
}

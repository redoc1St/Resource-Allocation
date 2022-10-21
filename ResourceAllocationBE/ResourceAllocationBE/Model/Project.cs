using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResourceAllocationBE.Model
{
    public class Project
    {
        public int Project_id { get; set; }
        public string Code { get; set; }
        public string ProjectName { get; set; }
        public int Department_id { get; set; }
        public int Effort_planned { get; set; }
        public int Effort_actual { get; set; }
        public int Effort_billable { get; set; }
        public int Quantity_plan { get; set; }
        public int Quantity_actual { get; set; }
        public string Start_plan { get; set; }
        public string Start_actual { get; set; }
        public string End_plan { get; set; }
        public string End_actual { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResourceAllocationBE.Model
{
    public class RequestModel
    {
        public int resourceRole_id { get; set; }
        public int type { get; set; }
        public int requestTo { get; set; }
        public int employee_id { get; set; }
        public string Date_start { get; set; }
        public string Date_end { get; set; }
        public int Effort { get; set; }
        public int Bill_rate { get; set; }
    }
}

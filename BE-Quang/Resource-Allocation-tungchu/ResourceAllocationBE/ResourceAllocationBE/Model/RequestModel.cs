using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResourceAllocationBE.Model
{
    public class RequestModel
    {
        public string resourceRole_id { get; set; }
        public string employee_id { get; set; }

        public int type { get; set; }
        public int requestTo { get; set; }
        
    }
}

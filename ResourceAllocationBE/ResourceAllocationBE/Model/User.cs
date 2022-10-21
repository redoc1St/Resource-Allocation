using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResourceAllocationBE.Model
{
    public class User
    {
        public int User_id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string UserType { get; set; }
        public int isActive { get; set; }
        public string BirthDay { get; set; }
        public string Start_Day { get; set; }
        public int Department_id { get; set; }


    }
}

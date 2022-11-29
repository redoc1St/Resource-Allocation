using ResourceAllocationBE.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceAllocation.UnitTest.UserTest
{
    public class UserMockData
    {
        public List<User> GetUsers()
        {
            return new List<User>
            {
                new User
                {
                    Address="Ha Noi",
                    User_id=100,
                    UserType="leader",
                    BirthDay="05/05/2000",
                    Department_id=1,
                    Email="quangdd123@gmail.com",
                    Fullname="do duc quang",
                    isActive=1,
                    Password="123@123a",
                    Start_Day="05/05/2000",
                    Username="quangdd12"

                },
                new User
                 {
                    Address="Ha Noi",
                    User_id=100,
                    UserType="employee",
                    BirthDay="05/05/2000",
                    Department_id=1,
                    Email="tungchu2000@gmail.com",
                    Fullname="chu trieu tung",
                    isActive=1,
                    Password="123@123a",
                    Start_Day="05/05/2000",
                    Username="tungct2000"

                }

            };
        }
    }
}

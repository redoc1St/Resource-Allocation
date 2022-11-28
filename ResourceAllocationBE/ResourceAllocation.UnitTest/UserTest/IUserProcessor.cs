using ResourceAllocationBE.Model;
using System;

namespace ResourceAllocation.UnitTest.UserTest
{
    public interface IUserProcessor
    {
        bool login(User user);
        bool getListUser(string type);
        bool serchByName(User user);
        bool getUserDetail(User user);
        bool changePass(User user,string newPass, string confirmPass);
    }
}

using ResourceAllocationBE.Model;
using System;

namespace ResourceAllocation.UnitTest.UserTest
{
    public interface IUserProcessor
    {
        bool login(User user);
        bool getListUser(string type);
        bool getUserDetail(User user);
        bool changePass(User user,string newPass, string confirmPass);
        bool createNewUser(string username, string fullname, string email, string address, string typeOfUser, string department, string bithDate, string startDate);
        bool updateUser(string fullName, string address);
    }
}

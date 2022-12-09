using ResourceAllocationBE.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceAllocation.UnitTest.UserTest
{
    public class UserProcessor : IUserProcessor
    {
        private readonly IResourceAllocationProcessor resourceAllocationProcessor;
        public UserProcessor(IResourceAllocationProcessor resourceAllocationProcessor)
        {
            this.resourceAllocationProcessor = resourceAllocationProcessor;
        }
        UserMockData userMock = new UserMockData();
        public bool login(User user)
        {

            //Email null
            if(user.Email.Length <= 0)
            {
                throw new ArgumentNullException("Email is not NULL");
            }

            if(user.Email != "tungchu2000@gmail.com")
            {
                throw new ArgumentException("Email is not true");
            }

            //Password null
            if (user.Password.Length <= 0)
            {
                throw new ArgumentNullException("Password is not null");
            }
            if (user.Password != "123456")
            {
                throw new ArgumentException("Password is not true");
            }
            return true;
        }

        public bool getListUser(string type)
        {
            if (type != "admin" && type != "leader")
            {
                return false;
            }
                return true;
        }

        

        public bool getUserDetail(User user)
        {
            if(user.Email == "")
            {
                throw new ArgumentNullException("Can't found user");
            }
            if (user.Email != "quangdd1412@gmail.com")
            {
                throw new ArgumentException("Can't found user");
            }
            return true;
        }

        public bool changePass(User user, string newPass, string confirmPass)
        {

            if(user.Password=="" || newPass=="" || confirmPass == "")
            {
                throw new ArgumentOutOfRangeException("Password is not null");
            }
            if (user.Password.Length < 6 || newPass.Length < 6 || confirmPass.Length < 6)
            {
                throw new ArgumentOutOfRangeException("Password is more than 6 charactor");
            }
            if (newPass != confirmPass) 
            {
                throw new ArgumentException("Confirm pass is not same with new pass");
            }
           
            if(user.Password != "123@123a")
            {
                throw new ArgumentException("Old password is not true");
            }
            return true;
        }

        public bool createNewUser(string username, string fullname, string email, string address, string typeOfUser, string department, string bithDate, string startDate)
        {
            if(username == "" || fullname == "" || startDate == "" || email == "" || address == "" || typeOfUser == "" || department == "" || bithDate == "")
            {
                throw new ArgumentNullException("Usernameor Email not null");
            }
            if(username.Length<6)
            {
                throw new ArgumentOutOfRangeException("User is more than 6 character");

            }
           
                if (email == "quangdd123@gmail.com")
                {
                    throw new ArgumentException("Email had existed");
                }
            
            
            if (!email.Contains("@gmail.com"))
            {
                throw new ArgumentException("Email not right format");
            }
            return resourceAllocationProcessor.InsertUser(username,fullname,email,address,typeOfUser,department,bithDate,startDate);
        }

        public bool updateUser(string fullName, string address)
        {
            if (fullName.Any(char.IsDigit))
            {
                throw new ArgumentException("Name does not contain number");
            }
            if(fullName==""||address=="")
            {
                throw new ArgumentException("Input not null");
            }
            return resourceAllocationProcessor.UpdateUser(fullName, address);
        }
    }
}

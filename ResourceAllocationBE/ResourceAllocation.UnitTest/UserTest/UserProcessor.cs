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
                throw new ArgumentOutOfRangeException("Email is not < 0");
            }

            if(user.Email != "tungchu2000@gmail.com")
            {
                throw new ArgumentOutOfRangeException("Email is not true");
            }

            //Password null
            if (user.Password.Length <= 0)
            {
                throw new ArgumentOutOfRangeException("Password is not null");
            }
            if (user.Password != "123456")
            {
                throw new ArgumentOutOfRangeException("Password is not true");
            }
            return true;
        }

        public bool getListUser(string type)
        {
            if (type != "admin")
            {
                return false;
            }
                return true;
        }

        public bool serchByName(User user)
        {
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

        public bool createNewUser(User user, string confirmPass)
        {
            if(user.Username == "" || user.Email == null)
            {
                throw new ArgumentNullException("Username or Password or Email not null");
            }
            if(user.Username.Length<6)
            {
                throw new ArgumentOutOfRangeException("User or Password is more than 6 character");

            }
            
            foreach (var item in userMock.GetUsers())
            {
                if (user.Email == item.Email)
                {
                    throw new ArgumentException("Email had existed");
                }
            }
            
            if (!user.Email.Contains("@gmail.com"))
            {
                throw new ArgumentException("Email not right format");
            }
            return resourceAllocationProcessor.InsertUser(user);
        }

        public bool updateUser(string fullName, string address)
        {
            if (fullName.Any(char.IsDigit))
            {
                throw new ArgumentException("Name does not contain number");
            }
            return true;
        }
    }
}

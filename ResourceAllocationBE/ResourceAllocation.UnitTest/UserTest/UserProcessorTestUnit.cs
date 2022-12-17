using Moq;
using System;
using Xunit;
using ResourceAllocationBE.Model;
using Xunit.Abstractions;

namespace ResourceAllocation.UnitTest.UserTest
{
    public class UserProcessorTestUnit
    {
        private readonly ITestOutputHelper output;

        public UserProcessorTestUnit(ITestOutputHelper output)
        {
            this.output = output;
        }
        // Email and password null
        [Fact]
        public void Test_Invalid_EmailPassNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(()=> userProcessor.login(new User {Email="", Password="" }
                ));
            output.WriteLine("Email is not NULL");
        }
        // Email null and password false
        [Fact]
        public void Test_Invalid_EmailNullPassFalse()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.login(new User { Email = "", Password = "abcxyz" }
                ));
            output.WriteLine("Password is not null");
        }

        // Email null and password true
        [Fact]
        public void Test_Invalid_EmailNullPassTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.login(new User { Email = "", Password = "123456" }
                ));
            output.WriteLine("Email is not NULL");
        }

        // Email true and password null
        [Fact]
        public void Test_Invalid_EmailTruePassNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.login(new User { Email = "tungchu2000@gmail.com", Password = "" }
                ));
            output.WriteLine("Password is not null");
        }

        // Email false and password null
        [Fact]
        public void Test_Invalid_EmailFailPassNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.login(new User { Email = "abcxyz@gmail.com", Password = "" }
                ));
            output.WriteLine("Email is not true");
        }

        // Email fail, passwrod true
        [Fact]
        public void Test_Invalid_EmailNotTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.login(new User { Email = "abcxyz@gmail.com", Password = "123456" }
                ));
            output.WriteLine("Email is not true");
        }
        // Email true, passwrod fail
        [Fact]
        public void Test_Invalid_PassNotTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.login(new User { Email = "tungchu2000@gmail.com", Password = "abcxyz" }
                ));
            output.WriteLine("Password is not true");
        }
        // Email fail, password fail
        [Fact]
        public void Test_Invalid_AllNotTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.login(new User { Email = "abcxyz@gmail.com", Password = "abcxyz" }
                ));
            output.WriteLine("Email is not true");
        }
        
        //LOGIN true
        [Fact]
        public void Test_Valid_LoginRight()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.login(new User { Email = "tungchu2000@gmail.com", Password = "123456" }
                ));
            output.WriteLine("login success");
        }


        // TEST GET LIST USER
        [Fact]
        public void TestInValidTypeToGetListUser()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.False(userProcessor.getListUser("employee"));
            output.WriteLine("false");
        }
        [Fact]
        public void TestInValidTypeToGetListUser2()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.getListUser("leader"));
            output.WriteLine("false");
        }
        [Fact]
        public void TestValidTypeToGetListUser()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.getListUser("admin"));
            output.WriteLine("success");
        }
        [Fact]
        public void TestInValidTypeToGetListUser3()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.False(userProcessor.getListUser(""));
            output.WriteLine("false");
        }


        //TEST GET USER DETAIL
        [Fact]
        public void TestEmptyUserEmail()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.getUserDetail(new User { Email = "" }));
            output.WriteLine("Can't found user");
        }
        [Fact]
        public void TestUserEmailIsNotTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.getUserDetail(new User { Email = "quang123@gmail.com" }));
            output.WriteLine("Can't found user");
        }
        [Fact]
        public void TestRightEmailUser()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.getUserDetail(new User { Email = "quangdd1412@gmail.com" }));
            output.WriteLine("success");
        }


        // TEST CHANGE PASSWORD
        // null
        [Fact]
        public void TestUserInputInChangePasswordNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "" }, "123@123b", "123@123b"));
            output.WriteLine("Password is not null");
        }
        [Fact]
        public void TestUserInputInChangePasswordNull2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "123@123a" }, "", "123@123b"));
            output.WriteLine("Password is not null");
        }
        [Fact]
        public void TestUserInputInChangePasswordNull3()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "123@123a" }, "123@123b", ""));
            output.WriteLine("Password is not null");
        }
        // o f, true, c true
        [Fact]
        public void TestInvalidUserInputInChangePassword()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.changePass(new User { Password = "abcxyz" }, "123@123b", "123@123b"));
            output.WriteLine("Password is more than 6 charactor");
        }

        // o true, n true, e 123
        [Fact]
        public void TestInvalidUserInputInChangePassword2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "123@123a" }, "123@123b", "abc"));
            output.WriteLine("Password is more than 6 charactor");
        }
        // true
        [Fact]
        public void TestValidUserInputInChangePassword()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.changePass(new User { Password = "123@123a" }, "123@123b", "123@123b"));
            output.WriteLine("success");
        }
        // o 123, n true, c 123
        [Fact]
        public void TestInvalidUserInputInChangePassword3()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "abc" }, "123@123b", "abc"));
            output.WriteLine("Password is more than 6 charactor");
        }
        // o true, n 123, c true
        [Fact]
        public void TestInvalidUserInputInChangePassword4()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "123@123a" }, "abc", "123@123b"));
            output.WriteLine("Password is more than 6 charactor");
        }


        // TEST INSERT USER
        //null
        [Fact]
        public void Test_Invalid_CreateUserNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.createNewUser(username: "quangdd1234", fullname: "", email: "quangdd12@gmail.com", address: "Ha Noi"
                , typeOfUser: "Employee", department: "Bu1", bithDate: "05/05/2000", startDate: "05/05/2022"));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void Test_Invalid_CreateUserNull2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.createNewUser(username: "quangdd1234", fullname: "Do Duc Quang", email: "", address: "Ha Noi"
                , typeOfUser: "Employee", department: "Bu1", bithDate: "05/05/2000", startDate: "05/05/2022"));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void Test_Invalid_CreateUserNull3()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.createNewUser(username: "quangdd1234", fullname: "Do Duc Quang", email: "quangdd12@gmail.com", address: ""
                , typeOfUser: "Employee", department: "Bu1", bithDate: "05/05/2000", startDate: "05/05/2022"));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void Test_Invalid_CreateUserNull4()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.createNewUser(username: "quangdd1234", fullname: "Do Duc Quang", email: "quangdd12@gmail.com", address: "Ha Noi"
                , typeOfUser: "Employee", department: "", bithDate: "05/05/2000", startDate: "05/05/2022"));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void Test_Invalid_CreateUserNull5()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.createNewUser(username: "quangdd1234", fullname: "Do Duc Quang", email: "quangdd12@gmail.com", address: "Ha Noi"
                , typeOfUser: "Employee", department: "Bu1", bithDate: "", startDate: "05/05/2022"));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void Test_Invalid_CreateUserNull6()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.createNewUser(username: "quangdd1234", fullname: "Do Duc Quang", email: "quangdd12@gmail.com", address: "Ha Noi"
                , typeOfUser: "", department: "Bu1", bithDate: "05/05/2000", startDate: "05/05/2022"));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void Test_Invalid_CreateUserNull7()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.createNewUser(username: "quangdd1234", fullname: "Do Duc Quang", email: "quangdd12@gmail.com", address: "Ha Noi"
                , typeOfUser: "Employee", department: "Bu1", bithDate: "05/05/2000", startDate: ""));
            output.WriteLine("Input not null");

        }
        // username < 6
        [Fact]
        public void Test_Invalid_CreateUserNameMoreThan6Char()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.createNewUser(username: "abc", fullname: "Do Duc Quang", email: "quangdd12@gmail.com", address: "Ha Noi"
                , typeOfUser: "Employee", department: "Bu1", bithDate: "05/05/2000", startDate: "05/05/2022"));
            output.WriteLine("User is more than 6 character");
        }
        
        // email not right
        [Fact]
        public void Test_Invalid_CreateUserThatEmailNotRightFormat()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.createNewUser(username:"quangdd1234", fullname: "Do Duc Quang", email: "quangdd12", address: "Ha Noi"
                , typeOfUser: "Employee", department: "Bu1", bithDate: "05/05/2000", startDate: "05/05/2022"));
            output.WriteLine("Email not right format");
        }
        // email has existed
        [Fact]
        public void Test_Invalid_CreateUserThatEmailHasExisted()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.createNewUser(username: "quangdd1234", fullname: "Do Duc Quang", email: "quangdd123@gmail.com", address: "Ha Noi"
                , typeOfUser: "Employee", department: "Bu1", bithDate: "05/05/2000", startDate: "05/05/2022"));
            output.WriteLine("Email had existed");
        }
        //true
        [Fact]
        public void Test_Valid_CreateUserReturnTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.InsertUser(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).Returns(true);
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.createNewUser(username:"quangdd1234",fullname:"Do Duc Quang",email:"quangdd12@gmail.com",address:"Ha Noi"
                ,typeOfUser:"Employee",department:"Bu1",bithDate:"05/05/2000",startDate:"05/05/2022"));
            output.WriteLine("success");
        }



        // TEST UPDATE USER INFORMATION
        [Fact]
        public void Test_Valid_UpdateUserReturnTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            resourceAllocationProcessor.Setup(p => p.UpdateUser(It.IsAny<string>(), It.IsAny<string>())).Returns(true);
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            output.WriteLine("success");
            Assert.True(userProcessor.updateUser("do duc quang", "Ha Noi"
                ));
        }
        [Fact]
        public void Test_InValid_UpdateUserReturnFail()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.updateUser("", "Ha Noi"
                ));
            output.WriteLine("Input not null");
        }
        [Fact]
        public void Test_InValid_UpdateUserReturnFail2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.updateUser("do duc quang", ""
                ));
            output.WriteLine("Input not null");
        }
    }
}

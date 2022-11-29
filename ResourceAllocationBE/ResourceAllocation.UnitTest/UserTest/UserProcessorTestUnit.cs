using Moq;
using System;
using Xunit;
using ResourceAllocationBE.Model;
namespace ResourceAllocation.UnitTest.UserTest
{
    public class UserProcessorTestUnit
    {
        // Email and password null
        [Fact]
        public void Test_Invalid_EmailPassNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(()=> userProcessor.login(new User {Email="", Password="" }
                ));
        }
        // Email null and password false
        [Fact]
        public void Test_Invalid_EmailNullPassFalse()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "", Password = "abcxyz" }
                ));
        }

        // Email null and password true
        [Fact]
        public void Test_Invalid_EmailNullPassTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "", Password = "123456" }
                ));
        }

        // Email true and password null
        [Fact]
        public void Test_Invalid_EmailTruePassNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "tungchu2000@gmail.com", Password = "" }
                ));
        }

        // Email false and password null
        [Fact]
        public void Test_Invalid_EmailFailPassNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "abcxyz@gmail.com", Password = "" }
                ));
        }

        // Email fail, passwrod true
        [Fact]
        public void Test_Invalid_EmailNotTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "abcxyz@gmail.com", Password = "123456" }
                ));
        }
        // Email true, passwrod fail
        [Fact]
        public void Test_Invalid_PassNotTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "tungchu2000@gmail.com", Password = "abcxyz" }
                ));
        }
        // Email fail, password fail
        [Fact]
        public void Test_Invalid_AllNotTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "abcxyz@gmail.com", Password = "abcxyz" }
                ));
        }
        
        //LOGIN true
        [Fact]
        public void Test_Valid_LoginRight()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.login(new User { Email = "tungchu2000@gmail.com", Password = "123456" }
                ));
        }


        // TEST GET LIST USER
        [Fact]
        public void TestInValidTypeToGetListUser()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.False(userProcessor.getListUser("employee"));
        }
        [Fact]
        public void TestInValidTypeToGetListUser2()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.False(userProcessor.getListUser("leader"));
        }
        [Fact]
        public void TestValidTypeToGetListUser()
        {

            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.getListUser("admin"));
        }



        // TEST SEARCH BY NAME
        [Fact]
        public void TestEmptyInputSearch()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.serchByName(new User { Username=""}));
        }
        [Fact]
        public void TestInputSearchBar()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.serchByName(new User { Username = "quang" }));
        }


        //TEST GET USER DETAIL
        [Fact]
        public void TestEmptyUserEmail()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.getUserDetail(new User { Email = "" }));
        }
        [Fact]
        public void TestUserEmailIsNotTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.getUserDetail(new User { Email = "quang123@gmail.com" }));
        }
        [Fact]
        public void TestRightEmailUser()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.getUserDetail(new User { Email = "quangdd1412@gmail.com" }));
        }


        // TEST CHANGE PASSWORD
        // null
        [Fact]
        public void TestUserInputInChangePasswordNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "" },"",""));
        }
        // o f, true, c true
        [Fact]
        public void TestInvalidUserInputInChangePassword()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.changePass(new User { Password = "abcxyz" }, "123@123b", "123@123b"));
        }
        // o true, n true, e 123
        [Fact]
        public void TestInvalidUserInputInChangePassword2()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.changePass(new User { Password = "123@123a" }, "123@123b", "abc"));
        }
        // true
        [Fact]
        public void TestValidUserInputInChangePassword()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.changePass(new User { Password = "123@123a" }, "123@123b", "123@123b"));
        }
        // o 123, n true, c 123
        [Fact]
        public void TestInvalidUserInputInChangePassword3()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "abc" }, "123@123b", "abc"));
        }
        // o true, n 123, c true
        [Fact]
        public void TestInvalidUserInputInChangePassword4()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "123@123a" }, "abc", "123@123b"));
        }


        // TEST INSERT USER
        //null
        [Fact]
        public void Test_Invalid_CreateUserNull()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentNullException>(() => userProcessor.createNewUser(new User {Username="", Email = "", Password = "" }, ""
                ));
        }
        // username < 6
        [Fact]
        public void Test_Invalid_CreateUserNameMoreThan6Char()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.createNewUser(new User { Username = "abcx", Email = "quangdd12@gmail.com", Password = "quangdd1234" }, "quangdd1234"
                ));
        }
        // password <6
        [Fact]
        public void Test_Invalid_CreatePasswordMoreThan6Char()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.createNewUser(new User { Username = "quangdd1234", Email = "quangdd12@gmail.com", Password = "abcx" }, "quangdd1234"
                ));
        }
        // confirm pass not right
        [Fact]
        public void Test_Invalid_CreateUserThatConfirmPasswordNotMatch()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.createNewUser(new User { Username = "quangdd1234", Email = "quangdd12@gmail.com", Password = "123@123a" }, "123a123"
                ));
        }
        // email not right
        [Fact]
        public void Test_Invalid_CreateUserThatEmailNotRightFormat()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.createNewUser(new User { Username = "quangdd1234", Email = "quangdd12gmailcom", Password = "123@123a" }, "123@123a"
                ));
        }
        // email has existed
        [Fact]
        public void Test_Invalid_CreateUserThatEmailHasExisted()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.Throws<ArgumentException>(() => userProcessor.createNewUser(new User { Username = "quangdd1234", Email = "quangdd123@gmail.com", Password = "123@123a" }, "123@123a"
                ));
        }
        //true
        [Fact]
        public void Test_Valid_CreateUserReturnTrue()
        {
            var resourceAllocationProcessor = new Mock<IResourceAllocationProcessor>();
            var userProcessor = new UserProcessor(resourceAllocationProcessor.Object);
            Assert.True(userProcessor.createNewUser(new User { Username = "quangdd1234", Email = "quangdd1234@gmail.com", Password = "123@123a" }, "123@123a"
                ));
        }
        // TEST UPDATE USER INFORMATION
    }
}

using Moq;
using ResourceAllocationBE.Controllers;
using ResourceAllocationBE.Model;
using System;
using Xunit;

namespace ResourceAllocation.UnitTest.UserTest
{
    public class UserProcessorTestUnit
    {
        // Email and password null
        [Fact]
        public void Test_Invalid_EmailPassNull()
        {
         
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentOutOfRangeException>(()=> userProcessor.login(new User {Email="", Password="" }
                ));
        }
        // Email null and password false
        [Fact]
        public void Test_Invalid_EmailNullPassFalse()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "", Password = "abcxyz" }
                ));
        }

        // Email null and password true
        [Fact]
        public void Test_Invalid_EmailNullPassTrue()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "", Password = "123456" }
                ));
        }

        // Email true and password null
        [Fact]
        public void Test_Invalid_EmailTruePassNull()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "tungchu2000@gmail.com", Password = "" }
                ));
        }

        // Email false and password null
        [Fact]
        public void Test_Invalid_EmailFailPassNull()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "abcxyz@gmail.com", Password = "" }
                ));
        }

        // Email fail, passwrod true
        [Fact]
        public void Test_Invalid_EmailNotTrue()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "abcxyz@gmail.com", Password = "123456" }
                ));
        }
        // Email true, passwrod fail
        [Fact]
        public void Test_Invalid_PassNotTrue()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "tungchu2000@gmail.com", Password = "abcxyz" }
                ));
        }
        // Email fail, password fail
        [Fact]
        public void Test_Invalid_AllNotTrue()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.login(new User { Email = "abcxyz@gmail.com", Password = "abcxyz" }
                ));
        }
        
        //LOGIN true
        [Fact]
        public void Test_Valid_PassNotTrue()
        {
            
            var userProcessor = new UserProcessor();
            Assert.True(userProcessor.login(new User { Email = "tungchu2000@gmail.com", Password = "123456" }
                ));
        }


        // TEST GET LIST USER
        [Fact]
        public void TestInValidTypeToGetListUser()
        {

            var userProcessor = new UserProcessor();
            Assert.False(userProcessor.getListUser("employee"));
        }
        [Fact]
        public void TestInValidTypeToGetListUser2()
        {

            var userProcessor = new UserProcessor();
            Assert.False(userProcessor.getListUser("leader"));
        }
        [Fact]
        public void TestValidTypeToGetListUser()
        {

            var userProcessor = new UserProcessor();
            Assert.True(userProcessor.getListUser("admin"));
        }



        // TEST SEARCH BY NAME
        [Fact]
        public void TestEmptyInputSearch()
        {
            var userProcessor = new UserProcessor();
            Assert.True(userProcessor.serchByName(new User { Username=""}));
        }
        [Fact]
        public void TestInputSearchBar()
        {
            var userProcessor = new UserProcessor();
            Assert.True(userProcessor.serchByName(new User { Username = "quang" }));
        }


        //TEST GET USER DETAIL
        [Fact]
        public void TestEmptyUserEmail()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentNullException>(() => userProcessor.getUserDetail(new User { Email = "" }));
        }
        [Fact]
        public void TestUserEmailIsNotTrue()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentException>(() => userProcessor.getUserDetail(new User { Email = "quang123@gmail.com" }));
        }
        [Fact]
        public void TestRightEmailUser()
        {
            var userProcessor = new UserProcessor();
            Assert.True(userProcessor.getUserDetail(new User { Email = "quangdd1412@gmail.com" }));
        }


        // TEST CHANGE PASSWORD
        // null
        [Fact]
        public void TestUserInputInChangePasswordNull()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "" },"",""));
        }
        // o f, true, c true
        [Fact]
        public void TestInvalidUserInputInChangePassword()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentException>(() => userProcessor.changePass(new User { Password = "abcxyz" }, "123@123b", "123@123b"));
        }
        // o true, n true, e 123
        [Fact]
        public void TestInvalidUserInputInChangePassword2()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "123@123a" }, "123@123b", "abc"));
        }
        // true
        [Fact]
        public void TestValidUserInputInChangePassword()
        {
            var userProcessor = new UserProcessor();
            Assert.True(userProcessor.changePass(new User { Password = "123@123a" }, "123@123b", "123@123b"));
        }
        // o 123, n true, c 123
        [Fact]
        public void TestInvalidUserInputInChangePassword3()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "abc" }, "123@123b", "abc"));
        }
        // o true, n 123, c true
        [Fact]
        public void TestInvalidUserInputInChangePassword4()
        {
            var userProcessor = new UserProcessor();
            Assert.Throws<ArgumentOutOfRangeException>(() => userProcessor.changePass(new User { Password = "123@123a" }, "abc", "123@123b"));
        }
    }
}

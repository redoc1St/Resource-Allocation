using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceAllocation.UnitTest.ExtraObjectTest
{
   public  interface IExtraObjectProcessor
    {
        bool getLeaderInfor(string code);
        bool getListPnameByRLS(string role, string levels, string skill);
        bool getRoleIdByRLSCode(string role, string levels, string skill, string code);
    }
}

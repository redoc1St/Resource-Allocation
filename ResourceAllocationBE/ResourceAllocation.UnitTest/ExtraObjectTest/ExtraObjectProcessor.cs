using ResourceAllocation.UnitTest.ExtraObjectTest;
using System;

namespace ResourceAllocation.UnitTest.NewFolder
{
    public class ExtraObjectProcessor : IExtraObjectProcessor
    {
        private readonly IResourceAllocationProcessor resourceAllocationProcessor;

        public ExtraObjectProcessor(IResourceAllocationProcessor resourceAllocationProcessor)
        {
            this.resourceAllocationProcessor = resourceAllocationProcessor;
        }
        public bool getLeaderInfor(string code)
        {
            if(code == "")
            {
                throw new ArgumentNullException("Cannot find leader infor");
            }
            return true;
        }

        public bool getListPnameByRLS(string role, string levels, string skill)
        {
            if (role == "" || levels == "" || skill == "")
            {
                throw new ArgumentNullException("Cannot find List Project Name");
            }
            return true;
        }

        public bool getRoleIdByRLSCode(string role, string levels, string skill, string code)
        {
            if (role == "" || levels == "" || skill == "" || code == "")
            {
                throw new ArgumentNullException("Cannot find Resouce Role id");
            }
            return true;
        }
    }
}

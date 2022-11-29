using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceAllocation.UnitTest.ResourcePoolTest
{
    public interface IResourcePoolProcessor
    {
        bool getListResourcePool(string type);
        bool getListResourcePoolByName(string name);
        bool getListResourcePoolByRLS(string role, string levels, string skill);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResourceAllocationBE
{
    public interface IJwtTokenManager
    {
        public string Authenticate(string email, string password);
    }
}

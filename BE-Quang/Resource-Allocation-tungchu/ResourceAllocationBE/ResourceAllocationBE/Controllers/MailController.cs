using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ResourceAllocationBE.Model;
using ResourceAllocationBE.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResourceAllocationBE.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailService mailService;
        public MailController(IMailService mailService)
        {
            this.mailService = mailService;
        }
        [HttpPost("sendMail")]
        public async Task<IActionResult> receiveMailNewPassword([FromForm] MailRequest request)
        {
            try
            {
                await mailService.SendEmailAsync(request);
                return Ok();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}

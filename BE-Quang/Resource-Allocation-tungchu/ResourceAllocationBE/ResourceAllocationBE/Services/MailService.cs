using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;
using ResourceAllocationBE.Model;
using ResourceAllocationBE.Setting;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ResourceAllocationBE.Services
{
    public class MailService : IMailService
    {
        private static Random random = new Random();
        private readonly MailSettings _mailSettings;
        private readonly IConfiguration _configuration;
        public MailService(IOptions<MailSettings> mailSettings, IConfiguration configuration)
        {
            _mailSettings = mailSettings.Value;
            _configuration = configuration;
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string ss = new string(Enumerable.Repeat(chars, 10)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();
            if (mailRequest.Attachments != null)
            {
                byte[] fileBytes;
                foreach (var file in mailRequest.Attachments)
                {
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            fileBytes = ms.ToArray();
                        }
                        builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
                    }
                }
            }
            builder.HtmlBody = "This is your new password: " + ss;
            email.Body = builder.ToMessageBody();

            string query = @"update dbo.[User]
                set [Password]= @Password
                WHERE email = @email";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ResourceAllocationDB_2");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email", mailRequest.ToEmail);
                    myCommand.Parameters.AddWithValue("@Password", ss);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.appPassword);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}
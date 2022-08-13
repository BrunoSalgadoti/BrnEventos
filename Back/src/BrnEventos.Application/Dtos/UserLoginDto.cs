using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BrnEventos.Application.Dtos
{
    public class UserLoginDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
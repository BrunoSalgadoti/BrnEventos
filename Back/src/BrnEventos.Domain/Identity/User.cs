using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrnEventos.Domain.Enum;
using Microsoft.AspNetCore.Identity;

namespace BrnEventos.Domain.Identity
{
    public class User : IdentityUser<int>
    {
        public string PrimeiroNome { get; set; }
        public string UltimoNome { get; set; }
        public Titulo Titulo { get; set; }
        public string Descricao { get; set; }
        public Funcao funcao { get; set; }
        public IEnumerable<UserRole> UserRoles { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BrnEventos.Domain.Identity;
using BrnEventos.Persistence.Contextos;
using BrnEventos.Persistence.Contratos;
using BrnGeral.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BrnEventos.Persistence
{
    public class UserPersist : GeralPersist, IUserPersist
    {
        private readonly BrnEventosContext _context;

        public UserPersist(BrnEventosContext context) : base(context)
        {
            _context = context;

        }
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
           return  await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUserNameAsync(string userName)
        {
            return await _context.Users
                                 .SingleOrDefaultAsync(user => user.UserName == userName.ToLower());
        }

    }
}
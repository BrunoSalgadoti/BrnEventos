using System.Threading.Tasks;
using BrnEventos.Persistence.Contextos;
using BrnEventos.Persistence.Contratos;

namespace BrnGeral.Persistence
{
    public class GeralPersist : IGeralPersist
    {
        private readonly BrnEventosContext _context;

        public GeralPersist(BrnEventosContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.AddAsync(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public interface IRedeSocialPersist
        {
        }
    }
}

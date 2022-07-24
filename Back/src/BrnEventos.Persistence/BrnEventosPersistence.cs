using System.Linq;
using System.Threading.Tasks;
using BrnEventos.Domain;
using Microsoft.EntityFrameworkCore;

namespace BrnEventos.Persistence
{
    public class BrnEventosPersistence : IBrnEventosPersistence
    {
        private readonly BrnEventosContext _context;

        public BrnEventosPersistence(BrnEventosContext context)
        {
            _context = context;
        }
        public void add<T>(T entity)
            where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity)
            where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity)
            where T : class
        {
            _context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entityArray)
            where T : class
        {
            _context.RemoveRange(entityArray);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
            .Include(e => e.Lotes)
            .Include(e => e.RedesSociais);

            if (includePalestrantes) 
            {
                query = query
                .Include(e => e.PalestrantesEventos)
                .ThenInclude(pe => pe.Palestrante);
            }

            query = query.OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Evento[]>
        GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
            .Include(e => e.Lotes)
            .Include(e => e.RedesSociais);

            if (includePalestrantes) 
            {
                query = query
                .Include(e => e.PalestrantesEventos)
                .ThenInclude(pe => pe.Palestrante);
            }

            query = query.OrderBy(e => e.Id)
                         .Where(e => e.Tema.ToLower().Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetEventoByIdAsync(int EventoId, bool includePalestrantes = false)
        {
             IQueryable<Evento> query = _context.Eventos
            .Include(e => e.Lotes)
            .Include(e => e.RedesSociais);

            if (includePalestrantes) 
            {
                query = query
                .Include(e => e.PalestrantesEventos)
                .ThenInclude(pe => pe.Palestrante);
            }

            query = query.OrderBy(e => e.Id)
                         .Where(e => e.Id == EventoId);

            return await query.FirstOrDefaultAsync();
        }

        public Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
        {
            throw new System.NotImplementedException();
        }

        public Task<Palestrante[]>
        GetAllPalestrantesByNomeAsync(string tema, bool includeEventos = false)
        {
            throw new System.NotImplementedException();
        }

        public Task<Palestrante>
        GetPalestranteByIdAsync(string PalestranteId, bool includeEventos = false)
        {
            throw new System.NotImplementedException();
        }
    }
}

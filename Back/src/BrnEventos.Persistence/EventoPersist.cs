using System.Linq;
using System.Threading.Tasks;
using BrnEventos.Domain;
using BrnEventos.Persistence.Contextos;
using BrnEventos.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace BrnEventos.Persistence
{
    public class EventoPersist : IEventoPersist
    {
        private readonly BrnEventosContext _context;

        public EventoPersist(BrnEventosContext context)
        {
            _context = context;
                            //Infere o NoTracking em todo EventoPersist
           // _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; 
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
                           
                query = query.AsNoTracking().OrderBy(e => e.Id); //Infere o NoTracking somente no metódo desejado 

            return await query.ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
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

            query = query.AsNoTracking().OrderBy(e => e.Id)
                         .Where(e => e.Tema.ToLower().Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
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

            query = query.AsNoTracking().OrderBy(e => e.Id)
                         .Where(e => e.Id == eventoId);

            return await query.FirstOrDefaultAsync();
        }
    }
}

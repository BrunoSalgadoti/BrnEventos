using System.Linq;
using System.Threading.Tasks;
using BrnEventos.Domain;
using BrnEventos.Persistence.Contextos;
using BrnEventos.Persistence.Contratos;
using BrnEventos.Persistence.Models;
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

        public async Task<PageList<Evento>> GetAllEventosAsync(int userId, PageParams pageParams, bool includePalestrantes = false)
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

            query = query.AsNoTracking()
                         .Where(e => (e.Tema.ToLower().Contains(pageParams.Term.ToLower()) ||
                                      e.Local.ToLower().Contains(pageParams.Term.ToLower())) &&
                                     e.UserId == userId)
                         .OrderBy(e => e.Id);

            return await PageList<Evento>.CreateAsync(query, pageParams.PageNumber, pageParams.pageSize);
        }
        public async Task<Evento> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false)
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
                         .Where(e => e.Id == eventoId && e.UserId == userId);

            return await query.FirstOrDefaultAsync();
        }
    }
}

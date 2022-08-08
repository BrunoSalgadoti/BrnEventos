using System.Linq;
using System.Threading.Tasks;
using BrnEventos.Domain;
using BrnEventos.Persistence.Contextos;
using BrnEventos.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace BrnEventos.Persistence
{
    public class LotePersist : ILotePersist
    {
        private readonly BrnEventosContext _context;

        public LotePersist(BrnEventosContext context)
        {
            _context = context;
        }

        public async Task<Lote> GetLoteByIdsAsync(int eventoId, int id)
        {
            IQueryable<Lote> query = _context.Lotes;

            query = query.AsNoTracking()
                         .Where(lote => lote.EventoId == eventoId
                                     && lote.Id == id);

            return await query.FirstOrDefaultAsync();

        }

        public async Task<Lote[]> GetLotesByEventoIdAsync(int eventoId)
        {
            IQueryable<Lote> query = _context.Lotes;

            query = query.AsNoTracking()
                         .Where(lote => lote.EventoId == eventoId);

            return await query.ToArrayAsync();

        }
    }
}
using System.Threading.Tasks;
using BrnEventos.Domain;

namespace BrnEventos.Persistence.Contratos
{
    public interface IEventoPersist
    {
        //EVENTOS
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false);
        Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}
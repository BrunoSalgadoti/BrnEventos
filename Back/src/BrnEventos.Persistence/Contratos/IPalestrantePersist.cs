using System.Threading.Tasks;
using BrnEventos.Domain;

namespace BrnEventos.Persistence.Contratos
{
    public interface IPalestrantesPersist
    {
        //PALESTRANTES
        Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos);
        Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos);
        Task<Palestrante> GetPalestranteByIdAsync(int palestranteId, bool includeEventos);
    }
}
using AutoMapper;
using BrnEventos.Domain;
using BrnEventos.Application.Dtos;

namespace BrnEventos.Application.Helpers
{
    public class BrnEventosProfile : Profile
    {
        public BrnEventosProfile()
       {
        CreateMap<Evento, EventoDto>().ReverseMap();
        CreateMap<Lote, LoteDto>().ReverseMap();
        CreateMap<Palestrante, PalestranteDto>().ReverseMap();
        CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
       } 
    }
}
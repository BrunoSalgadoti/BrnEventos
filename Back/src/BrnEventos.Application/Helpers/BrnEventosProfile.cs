using AutoMapper;
using BrnEventos.Domain;
using BrnEventos.Application.Dtos;
using BrnEventos.Domain.Identity;
using BrnEventos.Persistence.Models;

namespace BrnEventos.Application.Helpers
{
    public class BrnEventosProfile : Profile
    {
        public BrnEventosProfile()
        {
            CreateMap<Evento, EventoDto>().ReverseMap();
            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteAddDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteUpdateDto>().ReverseMap();
           
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<User, UserUpdateDto>().ReverseMap();
        }
    }
}
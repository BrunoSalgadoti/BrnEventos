using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrnEventos.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BrnEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public IEnumerable<Evento> _evento = new Evento[] {
                new Evento()
                {
                    EventoId = 1,
                    Tema = "Angular 12 e .Net 5",
                    LocalId = "Maragogi-AL",
                    Lote = "1º Lote",
                    QtdPessoas = 250,
                    DataEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
                    ImagemURL = "foto01.png"
                },
                 new Evento()
                {
                    EventoId = 2,
                    Tema = "Angular 12 e suas novidades",
                    LocalId = "Paulo Afonso-BA",
                    Lote = "2º Lote",
                    QtdPessoas = 450,
                    DataEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
                    ImagemURL = "foto02.png"
                }
            };
        public EventoController()
        {
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _evento;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id)
        {
            return _evento.Where(evento => evento.EventoId == id);
        }

        [HttpPost]
        public string Post()
        {
            return "Exemplo de Post";
        }

        [HttpPut("{id}")]
        public string Put(int id)
        {
            return "Exemplo de Put = {id}";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return "Exemplo de Delete = {id}";
        }
    }
}

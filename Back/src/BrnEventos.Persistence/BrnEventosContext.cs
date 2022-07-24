using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrnEventos.Domain;
using Microsoft.EntityFrameworkCore;

namespace BrnEventos.Persistence
{
    public class BrnEventosContext : DbContext
    {
        public BrnEventosContext(DbContextOptions<BrnEventosContext> options) 
            : base(options) { }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PalestranteEvento>()
                .HasKey(PE => new {PE.EventoId, PE.PalestranteId});
        }
    }
}
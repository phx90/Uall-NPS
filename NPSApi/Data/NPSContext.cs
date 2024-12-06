using Microsoft.EntityFrameworkCore;
using NPSApi.Models;

namespace NPSApi.Data;

public class NPSContext : DbContext
{
    public NPSContext(DbContextOptions<NPSContext> options) : base(options) { }
    public DbSet<Avaliacao> Avaliacoes { get; set; } = null!;
}

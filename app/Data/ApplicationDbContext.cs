using Microsoft.EntityFrameworkCore;
using Models;

namespace app.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Person> Persons { get; set; }
    public DbSet<Loan> Loans { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Loan>()
            .HasOne(l => l.Person)
            .WithMany(p => p.Loans)
            .HasForeignKey(l => l.PersonId)
            .IsRequired();
    }
}

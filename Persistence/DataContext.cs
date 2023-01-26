using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence;
public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options) //options = connection string
    {
    }
    public DbSet<Activity> Activities {get; set;}

    public DbSet<ActAtt> ActAtts {get;set;}
    public DbSet<Photo> Photos {get;set;}
    public DbSet<LiveComment> LiveComments {get;set;}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActAtt>()
            .HasKey(aa => new { aa.ActivityId, aa.AppUserId });
            
        builder.Entity<ActAtt>()
            .HasOne(aa => aa.Activity)
            .WithMany(a => a.Attendees)
            .HasForeignKey(aa => aa.ActivityId);

        builder.Entity<ActAtt>()
            .HasOne(aa => aa.AppUser)
            .WithMany(u => u.Activities)
            .HasForeignKey(aa => aa.AppUserId);

        builder.Entity<LiveComment>()
           .HasOne(a => a.Activity)
           .WithMany(c => c.LiveComments)  
           .OnDelete(DeleteBehavior.Cascade); //si eliminas una ACT, cascadea y borra los comments 
    }
}
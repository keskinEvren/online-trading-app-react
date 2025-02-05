using Microsoft.EntityFrameworkCore;
using OnlineTradingAppReact.Server.Models;

namespace OnlineTradingAppReact.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }
        public DbSet<Share> Shares { get; set; }
        public DbSet<PortfolioShare> PortfolioShares { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

    }
}

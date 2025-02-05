using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OnlineTradingAppReact.Server.Models
{
    public class Portfolio
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Balance { get; set; }


        public Guid UserId { get; set; }
        public virtual User? User { get; set; }


        public virtual ICollection<PortfolioShare>? PortfolioShares { get; set; }

        public bool IsBuyingOperationAffordable(int buyQuantity, decimal buyPrice)
        {
            return Balance >= buyQuantity * buyPrice;
        }
    }
}

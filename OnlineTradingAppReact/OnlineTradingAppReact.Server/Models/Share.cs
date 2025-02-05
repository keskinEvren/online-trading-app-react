using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OnlineTradingAppReact.Server.Models
{
    public class Share
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(3)]
        [RegularExpression("^[A-Z]{3}$", ErrorMessage = "Symbol must be exactly 3 uppercase characters.")]
        public string Symbol { get; set; }

        [Required]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Price { get; set; }

        [Required]
        public int Quantity { get; set; }

        public virtual ICollection<PortfolioShare>? PortfolioShares { get; set; }

        public bool IsBuyable()
        {
            return Quantity > 0;
        }
    }
}

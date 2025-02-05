using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OnlineTradingAppReact.Server.Models
{
    public class PortfolioShare
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public int Quantity { get; set; }
        
        
        
        

        public Guid PortfolioId { get; set; }

        public virtual Portfolio? Portfolio { get; set; }
        
        public Guid ShareId { get; set; }
        public virtual Share? Share { get; set; }
        
        
        
        
        

        public bool CanSellQuantity(int sellQuantity)
        {
            return Quantity >= sellQuantity;
        }
    }
}

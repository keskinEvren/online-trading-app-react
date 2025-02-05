using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OnlineTradingAppReact.Server.Models
{
    public class Transaction
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public int Quantity { get; set; }

        public DateTime? Date { get; set; }
        
        
        
        

        public virtual User? User { get; set; }
        public Guid UserId { get; set; }

        public virtual Share? Share { get; set; }
        public Guid ShareId { get; set; }
    }
}

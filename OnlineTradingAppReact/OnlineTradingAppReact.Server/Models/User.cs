using System.ComponentModel.DataAnnotations;

namespace OnlineTradingAppReact.Server.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }


        public virtual Portfolio? Portfolio { get; set; }
    }
}

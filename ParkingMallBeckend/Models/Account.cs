using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkingMallBeckend.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName ="nvarchar(50)")]
        public string Username { get; set; }
        public string Password { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }
    }
}

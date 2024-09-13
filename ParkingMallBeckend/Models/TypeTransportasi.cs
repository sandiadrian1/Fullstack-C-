using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkingMallBeckend.Models
{
    public class TypeTransportasi
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Nama { get; set; }
        public int BiayaPerJam { get; set; }
    }
}

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ParkingMallBeckend.Models
{
    public class Parkir
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int TypeTransportasiId { get; set; }
        public TypeTransportasi TypeTransportasi { get; set; }
        public string PlateNomor { get; set; }
        public DateTime WaktuMasuk { get; set; }
    }
}

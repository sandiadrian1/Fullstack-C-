using System.ComponentModel.DataAnnotations;

namespace ParkingMallBeckend.Models
{
    public class DetailParkir
    {
        [Key]
        public int Id { get; set; }
        public int ParkirId { get; set; }
        public Parkir Parkir { get; set; }
        public int BiayaPerJam { get; set; }

        [DisplayFormat(DataFormatString = "{0:N2}", ApplyFormatInEditMode = true)]
        public decimal BiayaParkir { get; set; }
        public string Status { get; set; }
    }
}

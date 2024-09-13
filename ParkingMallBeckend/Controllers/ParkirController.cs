using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkingMallBeckend.Data;
using ParkingMallBeckend.Models;
using ParkingMallBeckend.Models.BuffModels;

[Route("api/[controller]")]
[ApiController]
public class ParkirController : ControllerBase
{
    private readonly AppDbContext _context;

    public ParkirController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Parkir
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Parkir>>> GetParkirs()
    {
        return await _context.parkirs.Include(p => p.TypeTransportasi).ToListAsync();
    }

    // GET: api/Parkir/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Parkir>> GetParkir(int id)
    {
        var parkir = await _context.parkirs.Include(p => p.TypeTransportasi)
                                           .FirstOrDefaultAsync(p => p.Id == id);

        if (parkir == null)
        {
            return NotFound();
        }

        return parkir;
    }

    // PUT: api/Parkir/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutParkir(int id, Parkir parkir)
    {
        if (id != parkir.Id)
        {
            return BadRequest();
        }

        _context.Entry(parkir).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ParkirExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Parkir
    [HttpPost]
    public async Task<ActionResult<Parkir>> PostParkir(ParkirTampForm parkir)
    {
        // Fetch the TypeTransportasi entity from the database
        var typeTransportasi = await _context.typeTransportasis.FindAsync(parkir.TypeTransportasiId);

        if (typeTransportasi == null)
        {
            return BadRequest("Invalid TypeTransportasiId.");
        }

        var parkis = new Parkir()
        {
            Id = parkir.Id,
            TypeTransportasiId = parkir.TypeTransportasiId,
            TypeTransportasi = typeTransportasi,
            WaktuMasuk = parkir.WaktuMasuk,
            PlateNomor = parkir.PlateNomor
        };


        _context.parkirs.Add(parkis);
        await _context.SaveChangesAsync();

        /* return CreatedAtAction("GetParkir", new { id = parkir }, parkir);
     }*/
        return Created("/Parkir/" + parkis.Id, parkis);
    }

    // DELETE: api/Parkir/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteParkir(int id)
    {
        var parkir = await _context.parkirs.FindAsync(id);
        if (parkir == null)
        {
            return NotFound();
        }

        _context.parkirs.Remove(parkir);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ParkirExists(int id)
    {
        return _context.parkirs.Any(e => e.Id == id);
    }

    [HttpGet("{id}/detail")]
    public IActionResult GetDetail(int id, string status = "belum bayar")
    {
        var parkir = _context.parkirs.Include(x => x.TypeTransportasi).FirstOrDefault(x => x.Id == id);

        if (parkir == null)
        {
            return NotFound();
        }

        int biayaPerjam = parkir.TypeTransportasi.BiayaPerJam;
        decimal biayaParkir = 0;

        if (status == "sudah bayar")
        {
            status = "sudah bayar";
            biayaParkir = _context.detailParkirs
                .Where(x => x.Parkir.Id == id)
                .Select(x => x.BiayaParkir)
                .FirstOrDefault();
        }
        else
        {
            status = "belum bayar";
            biayaParkir = biayaPerjam * (decimal)(DateTime.Now - parkir.WaktuMasuk).TotalHours;
        }

        var detailView = new DetailParkirTampView()
        {
            ParkirId = parkir.Id,
            NamaType = parkir.TypeTransportasi.Nama,
            PlateNomor = parkir.PlateNomor,
            WaktuMasuk = parkir.WaktuMasuk,
            BiayaPerJam = biayaPerjam,
            BiayaParkir = biayaParkir,
            Status = status
        };

        return Ok(detailView);
    }

    /*  [HttpPost("detail")]
      public IActionResult PostDetail([FromBody] DetailParkirTampForm detailParkirTampForm)
      {
          var parkir = _context.parkirs.FirstOrDefault(x => x.Id == detailParkirTampForm.Parkir);

          if (parkir == null)
          {
              return NotFound();
          }

          var detailParkir = _context.detailParkirs.FirstOrDefault(x => x.Parkir.Id == detailParkirTampForm.Parkir);

          if (detailParkir == null)
          {
              detailParkir = new DetailParkir()
              {
                  Parkir = parkir,
                  BiayaPerJam = detailParkirTampForm.BiayaPerjam,
                  BiayaParkir = detailParkirTampForm.BiayaParkir,
                  Status = detailParkirTampForm.Status
              };

              _context.detailParkirs.Add(detailParkir);
          }
          else
          {
              detailParkir.BiayaPerJam = detailParkirTampForm.BiayaPerjam;
              detailParkir.BiayaParkir = detailParkirTampForm.BiayaParkir;
              detailParkir.Status = detailParkirTampForm.Status;
              _context.detailParkirs.Update(detailParkir);
          }

          _context.SaveChanges();

          return Ok(new { Message = "Detail parkir berhasil disimpan.", DetailParkir = detailParkir });
      }*/
    [HttpPost("detail")]
    public IActionResult PostDetail([FromBody] DetailParkirTampForm detailParkirTampForm)
    {
        var parkir = _context.parkirs.Include(x => x.TypeTransportasi)
                                     .FirstOrDefault(x => x.Id == detailParkirTampForm.Parkir);

        if (parkir == null)
        {
            return NotFound();
        }

        var detailParkir = _context.detailParkirs.FirstOrDefault(x => x.Parkir.Id == detailParkirTampForm.Parkir);

        decimal biayaParkir = detailParkirTampForm.Status == "sudah bayar"
            ? _context.detailParkirs
                .Where(x => x.Parkir.Id == detailParkirTampForm.Parkir)
                .Select(x => x.BiayaParkir)
                .FirstOrDefault()
            : detailParkirTampForm.BiayaPerjam * (decimal)(DateTime.Now - parkir.WaktuMasuk).TotalHours;

        if (detailParkir == null)
        {
            detailParkir = new DetailParkir()
            {
                Parkir = parkir,
                BiayaPerJam = detailParkirTampForm.BiayaPerjam,
                BiayaParkir = biayaParkir,
                Status = detailParkirTampForm.Status
            };

            _context.detailParkirs.Add(detailParkir);
        }
        else
        {
            detailParkir.BiayaPerJam = detailParkirTampForm.BiayaPerjam;
            detailParkir.BiayaParkir = biayaParkir;
            detailParkir.Status = detailParkirTampForm.Status;
            _context.detailParkirs.Update(detailParkir);
        }

        _context.SaveChanges();

        return Ok(new { Message = "Detail parkir berhasil disimpan.", DetailParkir = detailParkir });
    }

}

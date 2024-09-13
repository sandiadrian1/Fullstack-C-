using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkingMallBeckend.Data;
using ParkingMallBeckend.Models;

namespace ParkingMallBeckend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeTransportasiController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public TypeTransportasiController (AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        [Route("GetTypeTransportasi")]

        public async Task<IEnumerable<TypeTransportasi>> GetTypeTransportasi()
        {
            return await _appDbContext.typeTransportasis.ToListAsync(); 
        }

        [HttpPost]
        [Route("AddTypeTransportasi")]
        public async Task<TypeTransportasi> AddTypeTransportasi(TypeTransportasi typeTransportasi)
        {
            _appDbContext.typeTransportasis.Add(typeTransportasi);
            await _appDbContext.SaveChangesAsync();
            return typeTransportasi;
        }

        [HttpPatch]
        [Route("UpdateTypeTransportasi/{id}")]

        public async Task<TypeTransportasi> UpdateTypeTransportasi(TypeTransportasi typeTransportasi)
        {
            _appDbContext.Entry(typeTransportasi).State = EntityState.Modified;
            await _appDbContext.SaveChangesAsync();
            return typeTransportasi;
        }

        [HttpDelete]
        [Route("DeleteTypeTransportasi/{id}")]

        public bool DeleteTypeTransportasi(int id)
        {
            bool cek = false;
            var type = _appDbContext.typeTransportasis.Find(id);

            if(type != null)
            {
                cek = true;
                _appDbContext.Entry(type).State = EntityState.Deleted;
                _appDbContext.SaveChanges();
            }
            else
            {
                cek = false;
            }

            return cek;
        }
        




    }
}

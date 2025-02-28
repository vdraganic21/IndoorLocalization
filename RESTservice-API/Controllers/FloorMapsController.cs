using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using RESTservice_API.Models;
using RESTservice_API.Data;
using RESTservice_API.Interfaces;

namespace RESTservice_API.Controllers
{
    [ApiController]
    [Route("floormaps")]
    public class FloorMapsController : ControllerBase
    {
        private readonly IFloorMapRepository _repository;

        public FloorMapsController(IFloorMapRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetFloorMaps()
        {
            var floorMaps = await _repository.GetAllFloorMaps();
            return Ok(floorMaps);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFloorMapById(int id)
        {
            var floorMap = await _repository.GetFloorMapDetailsAsync(id);
            if (floorMap == null) return NotFound();
            return Ok(floorMap);
        }

        [HttpPost]
        public IActionResult CreateFloorMap([FromBody] FloorMap floorMap)
        {
            _repository.AddFloorMap(floorMap);
            _repository.SaveChanges();
            return CreatedAtAction(nameof(GetFloorMapById), new { id = floorMap.Id }, floorMap);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateFloorMap(int id, [FromBody] FloorMap updatedFloorMap)
        {
            var floorMap = _repository.GetFloorMapById(id);
            if (floorMap == null) return NotFound();

            floorMap.Name = updatedFloorMap.Name;
            floorMap.ImageBase64 = updatedFloorMap.ImageBase64;

            _repository.UpdateFloorMap(floorMap);
            _repository.SaveChanges();
            return Ok(floorMap);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFloorMap(int id)
        {
            var floorMap = _repository.GetFloorMapById(id);
            if (floorMap == null) return NotFound();

            var assets = _repository.GetAssetsByFloorMapId(id);
            foreach (var asset in assets)
            {
                asset.Active = false;
            }
            _repository.UpdateAssets(assets);
            _repository.DeleteFloorMap(id);
            _repository.SaveChanges();
            return NoContent();
        }

        [HttpDelete("reset")]
        public IActionResult ResetFloorMaps()
        {
            _repository.ResetFloorMaps();
            return Ok();
        }
    }
}

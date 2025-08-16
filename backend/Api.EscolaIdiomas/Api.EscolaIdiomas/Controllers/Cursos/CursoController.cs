using Api.EscolaIdiomas.Domain.Interfaces.Cursos;
using Microsoft.AspNetCore.Mvc;

namespace Api.EscolaIdiomas.Controllers.Cursos
{


    [ApiController]
    [Route("cursos")]
    public class CursoController : Controller
    {
        private readonly ICursosService _cursosService;

        public CursoController(ICursosService cursosServices)
        {
            _cursosService = cursosServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetCursos()
        {
            var cursosResponse = await _cursosService.GetCursos();

            if (cursosResponse == null)
            {
                return NotFound();
            }

            return Ok(cursosResponse);
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetCursoById()
        {
            var curso = await _cursosService.GetCursoById();

            if (curso == null)
            {
                return NotFound();
            }

            return Ok(curso);
        }
    }
}

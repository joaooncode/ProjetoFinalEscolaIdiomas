using Api.EscolaIdiomas.Domain.Interfaces.Cursos;
using Microsoft.AspNetCore.Mvc;

namespace Api.EscolaIdiomas.Controllers.Cursos
{


    [ApiController]
    [Route("cursos")]
    public class CursoController : Controller
    {
        private readonly ICursosRepository _cursosRepository;

        public CursoController(ICursosRepository cursosRepository)
        {
            _cursosRepository = cursosRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetCursos()
        {
            var cursosResponse = await _cursosRepository.GetCursos();

            if (cursosResponse == null)
            {
                return NotFound();
            }

            return Ok(cursosResponse);
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetCursoById(long id)
        {
            var curso = await _cursosRepository.GetCursoById(id);

            if (curso == null)
            {
                return NotFound();
            }

            return Ok(curso);
        }
    }
}

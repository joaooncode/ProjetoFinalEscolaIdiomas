using Api.EscolaIdiomas.Domain.DTO.Requests.Cursos;
using Api.EscolaIdiomas.Domain.DTO.Responses.Errors;
using Api.EscolaIdiomas.Domain.Interfaces.Cursos;
using Microsoft.AspNetCore.Mvc;

namespace Api.EscolaIdiomas.Controllers.Cursos
{
    [ApiController]
    [Route("cursos")]
    public class CursosController : Controller 
    {
        
        private readonly ICursosService _cursosService;

        public CursosController(ICursosService cursosService)
        {
            _cursosService = cursosService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCursos()
        {
            
            var cursosResponse = await _cursosService.GetCursos();
            return Ok(cursosResponse);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCursoById(long id)
        {
            var curso = await _cursosService.GetCursoById(id);

            if (curso == null)
            {
                
                var response = new Errors
                {
                    Mensagem = $"Nenhum curso encontrado com ID {id}",
                    Status = "404"
                };
                return NotFound(response);
            }

            return Ok(curso);
        }

        

        [HttpPost]
        public async Task<IActionResult> InsertCurso([FromBody] InsertCursoRequest request)
        {
            try
            {
                var response = await _cursosService.InsertCurso(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = new Errors()
                {
                    Mensagem = $"Falha ao cadastrar novo curso: {ex.Message}",
                    Status = "400"
                };
                return BadRequest(response);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCurso([FromRoute] long id, [FromBody] UpdateCursoRequest request)
        {
            try
            {
                await _cursosService.UpdateCurso(id, request);
                return Ok("Curso atualizado com sucesso.");
            }
            catch (Exception ex)
            {
                var error = new Errors
                {
                    Mensagem = ex.Message,
                    Status = "400",
                };
                return BadRequest(error);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurso([FromRoute] long id)
        {
            try
            {
                await _cursosService.DeleteCurso(id);
                return Ok("Curso deletado com sucesso.");
            }
            catch (Exception ex)
            {
                var error = new Errors
                {
                    Mensagem = ex.Message,
                    Status = "400"
                };
                return BadRequest(error);
            }
        }
    }
}
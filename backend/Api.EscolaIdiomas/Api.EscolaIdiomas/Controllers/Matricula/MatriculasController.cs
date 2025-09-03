using Api.EscolaIdiomas.Domain.DTO.Requests.Matriculas;
using Api.EscolaIdiomas.Domain.DTO.Responses.Errors;
using Api.EscolaIdiomas.Domain.Interfaces.Matriculas;
using Microsoft.AspNetCore.Mvc;

namespace Api.EscolaIdiomas.Controllers.Matricula
{
    [ApiController]
    [Route("matriculas")]
    public class MatriculasController : Controller
    {
        private readonly IMatriculasService _matriculasService;

        public MatriculasController(IMatriculasService matriculasService)
        {
            _matriculasService = matriculasService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMatriculas()
        {
            try
            {
                var matriculasResponse = await _matriculasService.GetMatriculas();
                return Ok(matriculasResponse);
            }
            catch (Exception ex)
            {
                var response = new Errors
                {
                    Mensagem = ex.Message,
                    Status = "400"
                };
                return BadRequest(response);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMatriculaById(long id)
        {
            try
            {
                var matricula = await _matriculasService.GetMatriculaById(id);

                if (matricula == null)
                {
                    var response = new Errors
                    {
                        Mensagem = $"Nenhuma matrícula encontrada com ID {id}",
                        Status = "404"
                    };

                    return NotFound(response);
                }

                return Ok(matricula);
            }
            catch (Exception ex)
            {
                var response = new Errors
                {
                    Mensagem = ex.Message,
                    Status = "400"
                };
                return BadRequest(response);
            }
        }

        [HttpGet("aluno/{alunoId}")]
        public async Task<IActionResult> GetMatriculasByAlunoId(long alunoId)
        {
            try
            {
                var matriculasResponse = await _matriculasService.GetMatriculasByAlunoId(alunoId);
                return Ok(matriculasResponse);
            }
            catch (Exception ex)
            {
                var response = new Errors
                {
                    Mensagem = ex.Message,
                    Status = "400"
                };
                return BadRequest(response);
            }
        }

        [HttpGet("curso/{cursoId}")]
        public async Task<IActionResult> GetMatriculasByCursoId(long cursoId)
        {
            try
            {
                var matriculasResponse = await _matriculasService.GetMatriculasByCursoId(cursoId);
                return Ok(matriculasResponse);
            }
            catch (Exception ex)
            {
                var response = new Errors
                {
                    Mensagem = ex.Message,
                    Status = "400"
                };
                return BadRequest(response);
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertMatricula([FromBody] InsertMatriculaRequest request)
        {
            try
            {
                var response = await _matriculasService.InsertMatricula(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = new Errors()
                {
                    Mensagem = $"Falha ao realizar matrícula: {ex.Message}",
                    Status = "400"
                };

                return BadRequest(response);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMatricula([FromRoute] long id, [FromBody] UpdateMatriculaRequest updateMatriculaRequest)
        {
            try
            {
                await _matriculasService.UpdateMatricula(id, updateMatriculaRequest);
                return Ok("Matrícula atualizada com sucesso.");
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
        public async Task<IActionResult> DeleteMatricula([FromRoute] long id)
        {
            try
            {
                await _matriculasService.DeleteMatricula(id);
                return Ok("Matrícula deletada com sucesso.");
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

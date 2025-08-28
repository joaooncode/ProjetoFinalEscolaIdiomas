using Api.EscolaIdiomas.Domain.DTO.Requests.Professores;
using Api.EscolaIdiomas.Domain.DTO.Responses.Errors;
using Api.EscolaIdiomas.Domain.Interfaces.Professores;
using Microsoft.AspNetCore.Mvc;

namespace Api.EscolaIdiomas.Controllers.Professores
{
    [ApiController]
    [Route("professores")]
    public class ProfessoresController : Controller
    {
        private readonly IProfessoresService _professoresService;

        public ProfessoresController(IProfessoresService professoresService)
        {
            _professoresService = professoresService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfessores()
        {
            var professoresResponse = await _professoresService.GetProfessores();
            return Ok(professoresResponse);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfessorById(long id)
        {
            var professor = await _professoresService.GetProfessorById(id);

            if (professor == null)
            {
                var response = new Errors
                {
                    Mensagem = $"Nenhum professor encontrado com ID {id}",
                    Status = "404"
                };
                return NotFound(response);
            }

            return Ok(professor);
        }

        [HttpPost]
        public async Task<IActionResult> InsertProfessor([FromBody] InsertProfessoresRequest request)
        {
            try
            {
                var response = await _professoresService.InsertProfessor(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = new Errors()
                {
                    Mensagem = $"Falha ao cadastrar novo professor, {ex.Message}",
                    Status = "400"
                };
                return BadRequest(response);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProfessor([FromRoute] long id, [FromBody] UpdateProfessoresRequest updateProfessorRequest)
        {
            try
            {
                await _professoresService.UpdateProfessor(id, updateProfessorRequest);
                return Ok();
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
        public async Task<IActionResult> DeleteProfessor([FromRoute] long id)
        {
            try
            {
                await _professoresService.DeleteProfessor(id);
                return Ok();
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
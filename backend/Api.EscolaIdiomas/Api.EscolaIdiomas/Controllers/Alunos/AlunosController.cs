using Api.EscolaIdiomas.Domain.DTO.Requests.Alunos;
using Api.EscolaIdiomas.Domain.DTO.Responses.Errors;
using Api.EscolaIdiomas.Domain.Interfaces.Alunos;
using Microsoft.AspNetCore.Mvc;

namespace Api.EscolaIdiomas.Controllers.Alunos
{


    [ApiController]
    [Route("alunos")]
    public class AlunosController : Controller
    {
        private readonly IAlunosService _alunosService;

        public AlunosController(IAlunosService alunosService)
        {
            _alunosService = alunosService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAlunos()
        {
            var alunosResponse = await _alunosService.GetAlunos();

            return Ok(alunosResponse);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlunoById(long id)
        {
            var aluno = await _alunosService.GetAlunoById(id);

            if (aluno == null)
            {
                var response = new Errors
                {
                    Mensagem = $"Nenhum aluno encontrado com ID {id}",
                    Status = "404"
                };

                return NotFound(response);
            }

            return Ok(aluno); 
        }


        [HttpPost]
        public async Task<IActionResult> InsertAluno([FromBody] InsertAlunoRequest request)
        {
            try
            {
                var response = await _alunosService.InsertAluno(request);

                return Ok(response);
            }
            catch (Exception ex)
            {

                var response = new Errors()
                {
                    Mensagem = $"Falha ao cadastrar novo aluno, {ex.Message}",
                    Status = "400"
                };

                return BadRequest(response);
            }
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateAluno([FromRoute] long id, [FromBody] UpdateAlunoRequest updateAlunoRequest)
        {
            try
            {
                await _alunosService.UpdateAluno(id, updateAlunoRequest);
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
        public async Task<IActionResult> DeleteAluno([FromRoute] long id)
        {
            try
            {
                await _alunosService.DeleteAluno(id);

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

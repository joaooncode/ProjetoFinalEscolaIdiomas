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
        public async Task<IActionResult> Get()
        {
            var alunosResponse = await _alunosService.GetAlunos();

            return Ok(alunosResponse);
        }
    }
}

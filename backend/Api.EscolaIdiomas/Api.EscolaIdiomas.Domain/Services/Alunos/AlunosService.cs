using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.EscolaIdiomas.Domain.DTO.Responses.Alunos;
using Api.EscolaIdiomas.Domain.Interfaces.Alunos;

namespace Api.EscolaIdiomas.Domain.Services.Alunos
{
    public class AlunosService : IAlunosService
    {

        private readonly IAlunosRepository _alunosRepository;

        public AlunosService(IAlunosRepository alunosRepository)
        {
            _alunosRepository = alunosRepository;
        }

        public async Task<IEnumerable<GetAlunosResponse>> GetAlunos()
        {
           var alunos = await   _alunosRepository.GetAlunos();

            if (alunos == null)
            {
                throw new Exception($"Nenhum aluno encontrado!");
            }

            var response = alunos.Select(a => new GetAlunosResponse { Id = a.Id, Nome = a.Nome });

            return response;
        }
    }
}

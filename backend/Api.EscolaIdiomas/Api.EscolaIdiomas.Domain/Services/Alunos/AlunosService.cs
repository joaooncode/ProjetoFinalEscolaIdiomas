using Api.EscolaIdiomas.Domain.DTO.Requests.Alunos;
using Api.EscolaIdiomas.Domain.DTO.Responses.Alunos;
using Api.EscolaIdiomas.Domain.Interfaces.Alunos;
using Api.EscolaIdiomas.Domain.Models.Alunos;

namespace Api.EscolaIdiomas.Domain.Services.Alunos
{
    public class AlunosService : IAlunosService
    {

        private readonly IAlunosRepository _alunosRepository;

        public AlunosService(IAlunosRepository alunosRepository)
        {
            _alunosRepository = alunosRepository;
        }

        public async Task<GetAlunoByIdResponse> GetAlunoById(long id)
        {
            var aluno = await _alunosRepository.GetAlunoById(id);

            if (aluno == null) return null;
            

            return new GetAlunoByIdResponse()
            {
                Id = aluno.Id,
                Nome = aluno.Nome,
                Sobrenome = aluno.Sobrenome,
                DataDeNascimento = aluno.DataDeNascimento,
                DataMatricula = aluno.DataMatricula,
                Email = aluno.Email,
                Telefone = aluno.Telefone,
                Ativo = aluno.Ativo,
            };
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

        public async Task<InsertAlunoResponse> InsertAluno(InsertAlunoRequest request)
        {
            try
            {
                var aluno = new Aluno()
                {
                    Nome = request.Nome,
                    Sobrenome = request.Sobrenome,
                    DataDeNascimento = request.DataDeNascimento,
                    Email = request.Email,
                    Telefone = request.Telefone,
                    Ativo = request.Ativo,
                    DataMatricula = request.DataMatricula
                };

                var response = await _alunosRepository.InsertAluno(aluno);


                var newAluno = new InsertAlunoResponse()
                {
                    Id = response
                };

                return newAluno;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

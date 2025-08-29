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

        public async Task DeleteAluno(long id)
        {
            var aluno = await _alunosRepository.GetAlunoById(id);

            if (aluno == null)
            {
                throw new Exception($"Nenhum aluno encontrado com id: {id}");
            }


            await _alunosRepository.DeleteAluno(id);
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
            var alunos = await _alunosRepository.GetAlunos();

            if (alunos == null)
            {
                throw new Exception($"Nenhum aluno encontrado!");
            }

            var response = alunos.Select(a => new GetAlunosResponse 
            { 
                Id = a.Id, 
                Nome = a.Nome,
                Sobrenome = a.Sobrenome,
                Email = a.Email,
                Telefone = a.Telefone,
                DataDeNascimento = a.DataDeNascimento,
                DataMatricula = a.DataMatricula,
                Ativo = a.Ativo
            });

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
                    DataMatricula = request.DataMatricula ?? DateTime.Now // Usar data atual se não fornecida
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

        public async Task UpdateAluno(long id, UpdateAlunoRequest request)
        {
            try
            {
                var aluno = await _alunosRepository.GetAlunoById(id);

                if (aluno == null)
                {
                    throw new Exception($"Não foi possivel encontrado um aluno com o id {id}");
                }

                aluno.Telefone = request.Telefone;
                aluno.Email = request.Email;


                await _alunosRepository.UpdateAluno(aluno);
            }
            catch (Exception ex)
            {

                throw new Exception($"Erro ao atualizar aluno: {ex}");
            }
        }
    }
}

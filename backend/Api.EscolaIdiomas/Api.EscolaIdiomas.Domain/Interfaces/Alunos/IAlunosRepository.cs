using Api.EscolaIdiomas.Domain.Models.Alunos;

namespace Api.EscolaIdiomas.Domain.Interfaces.Alunos
{
    public interface IAlunosRepository
    {
        Task<IEnumerable<Aluno>> GetAlunos();

        Task<Aluno> GetAlunoById(long id);

        Task<long> InsertAluno(Aluno aluno);
    }
}

using Api.EscolaIdiomas.Domain.DTO.Requests.Alunos;
using Api.EscolaIdiomas.Domain.DTO.Responses.Alunos;

namespace Api.EscolaIdiomas.Domain.Interfaces.Alunos
{
    public interface IAlunosService
    {
        Task<GetAlunoByIdResponse> GetAlunoById(long id);
        Task <IEnumerable<GetAlunosResponse>>GetAlunos();
        Task<InsertAlunoResponse> InsertAluno(InsertAlunoRequest request);
    }
}

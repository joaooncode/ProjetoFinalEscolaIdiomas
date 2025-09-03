using Api.EscolaIdiomas.Domain.DTO.Requests.Matriculas;
using Api.EscolaIdiomas.Domain.DTO.Responses.Matriculas;

namespace Api.EscolaIdiomas.Domain.Interfaces.Matriculas
{
    public interface IMatriculasService
    {
        Task<IEnumerable<GetMatriculasResponse>> GetMatriculas();
        Task<GetMatriculaByIdResponse?> GetMatriculaById(long id);
        Task<IEnumerable<GetMatriculasResponse>> GetMatriculasByAlunoId(long alunoId);
        Task<IEnumerable<GetMatriculasResponse>> GetMatriculasByCursoId(long cursoId);
        Task<InsertMatriculaResponse> InsertMatricula(InsertMatriculaRequest request);
        Task UpdateMatricula(long id, UpdateMatriculaRequest request);
        Task DeleteMatricula(long id);
    }
}

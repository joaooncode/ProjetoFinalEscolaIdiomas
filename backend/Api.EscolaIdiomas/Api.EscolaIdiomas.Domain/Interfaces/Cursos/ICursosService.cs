using Api.EscolaIdiomas.Domain.DTO.Requests.Cursos;
using Api.EscolaIdiomas.Domain.DTO.Responses.Cursos;

namespace Api.EscolaIdiomas.Domain.Interfaces.Cursos
{
    public interface ICursosService
    {
        
        Task<IEnumerable<GetCursosResponse>> GetCursos();
        Task<GetCursoByIdResponse> GetCursoById(long id);
        Task<InsertCursoResponse> InsertCurso(InsertCursoRequest request);
        Task UpdateCurso(long id, UpdateCursoRequest request);
        Task DeleteCurso(long id);

    }
}

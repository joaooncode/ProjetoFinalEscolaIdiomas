using Api.EscolaIdiomas.Domain.DTO.Responses.Cursos;

namespace Api.EscolaIdiomas.Domain.Interfaces.Cursos
{
    public interface ICursosService
    {
        Task GetCursoById(long id);
        Task<IEnumerable<GetCursosResponse>> GetCursos();
    }
}

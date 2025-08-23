using Api.EscolaIdiomas.Domain.DTO.Responses.Cursos;
using Api.EscolaIdiomas.Domain.Models.Cursos;

namespace Api.EscolaIdiomas.Domain.Interfaces.Cursos
{
    public interface ICursosRepository
    {
        Task<Curso> GetCursoById(long id);
        Task<IEnumerable<Curso>> GetCursos();
    }
}

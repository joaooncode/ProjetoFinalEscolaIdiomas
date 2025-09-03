using Api.EscolaIdiomas.Domain.Models.Matriculas;

namespace Api.EscolaIdiomas.Domain.Interfaces.Matriculas
{
    public interface IMatriculasRepository
    {
        Task<IEnumerable<Matricula>> GetMatriculas();
        Task<Matricula?> GetMatriculaById(long id);
        Task<IEnumerable<Matricula>> GetMatriculasByAlunoId(long alunoId);
        Task<IEnumerable<Matricula>> GetMatriculasByCursoId(long cursoId);
        Task<long> InsertMatricula(Matricula matricula);
        Task UpdateMatricula(Matricula matricula);
        Task DeleteMatricula(long id);
        Task<bool> ExisteMatricula(long alunoId, long cursoId);
    }
}

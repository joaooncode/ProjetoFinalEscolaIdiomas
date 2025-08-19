using Api.EscolaIdiomas.Domain.DTO.Responses.Cursos;
using Api.EscolaIdiomas.Domain.Interfaces.Cursos;
using Api.EscolaIdiomas.Domain.Models.Cursos;
using Api.EscolaIdiomas.Infra.Data.DatabaseConfiguration;
using Dapper;

namespace Api.EscolaIdiomas.Infra.Data.Repositories.Cursos
{
    public class CursosRepository : ICursosRepository
    {
        private readonly DatabaseContext _context;

        public CursosRepository(DatabaseContext context )
        {
            _context = context;
        }

        public async Task<Curso> GetCursoById( long id)
        {
            return await _context.CreateConnection().QueryFirstOrDefaultAsync(
                @"SELECT * FROM cursos WHERE id = @id", new { id = id }
);
        }

        public async Task<IEnumerable<Curso>> GetCursos()
        {
            return await _context.CreateConnection().QueryAsync<Curso>(@"SELECT id, nome FROM cursos ORDER BY nome");
        }
    }
}

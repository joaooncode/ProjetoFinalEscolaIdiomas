using Api.EscolaIdiomas.Domain.Interfaces.Cursos;
using Api.EscolaIdiomas.Domain.Models.Cursos;
using Api.EscolaIdiomas.Infra.Data.DatabaseConfiguration;
using Dapper;

namespace Api.EscolaIdiomas.Infra.Data.Repositories.Cursos
{
    public class CursosRepository : ICursosRepository
    {
        private readonly DatabaseContext _context;

        public CursosRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Curso> GetCursoById(long id)
        {
          
            return await _context.CreateConnection().QueryFirstOrDefaultAsync<Curso>(
                @"SELECT 
                    id,
                    nome,
                    descricao,
                    carga_horaria AS CargaHoraria,
                    valor,
                    ativo
                  FROM cursos WHERE id = @id", new { id });
        }

        public async Task<IEnumerable<Curso>> GetCursos()
        {
            return await _context.CreateConnection().QueryAsync<Curso>(
                @"SELECT id, nome FROM cursos ORDER BY nome"
            );
        }

        

        public async Task<long> InsertCurso(Curso curso)
        {
            
            return await _context.CreateConnection().QuerySingleAsync<long>(
                @"INSERT INTO cursos (nome, descricao, carga_horaria, valor, ativo)
                  VALUES (@Nome, @Descricao, @CargaHoraria, @Valor, @Ativo)
                  RETURNING id;",
                curso
            );
        }

        public async Task UpdateCurso(Curso curso)
        {
            await _context.CreateConnection().ExecuteAsync(
                @"UPDATE cursos SET
                    nome = @Nome,
                    descricao = @Descricao,
                    carga_horaria = @CargaHoraria,
                    valor = @Valor,
                    ativo = @Ativo
                  WHERE id = @Id;",
                curso
            );
        }

        public async Task DeleteCurso(long id)
        {
            await _context.CreateConnection().ExecuteAsync(
                @"DELETE FROM cursos WHERE id = @Id", new { Id = id }
            );
        }
    }
}
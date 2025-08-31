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
                    c.id,
                    c.nome,
                    c.descricao,
                    c.data_criacao AS DataCriacao,
                    c.carga_horaria AS CargaHoraria,
                    c.valor,
                    c.ativo,
                    c.categoria AS Categoria,
                    c.professor_id AS ProfessorId,
                    p.nome AS NomeProfessor,
                    p.sobrenome AS SobrenomeProfessor
                  FROM cursos c
                  LEFT JOIN professores p ON c.professor_id = p.id
                  WHERE c.id = @id", new { id });
        }

        public async Task<IEnumerable<Curso>> GetCursos()
        {
            return await _context.CreateConnection().QueryAsync<Curso>(
                @"SELECT 
                    c.id,
                    c.nome,
                    c.descricao,
                    c.data_criacao AS DataCriacao,
                    c.carga_horaria AS CargaHoraria,
                    c.valor,
                    c.ativo,
                    c.categoria AS Categoria,
                    c.professor_id AS ProfessorId,
                    p.nome AS NomeProfessor,
                    p.sobrenome AS SobrenomeProfessor
                  FROM cursos c
                  LEFT JOIN professores p ON c.professor_id = p.id
                  ORDER BY c.nome"
            );
        }

        

        public async Task<long> InsertCurso(Curso curso)
        {
            
            return await _context.CreateConnection().QuerySingleAsync<long>(
                @"INSERT INTO cursos (nome, descricao, carga_horaria, data_criacao, valor, categoria, ativo, professor_id)
                  VALUES (@Nome, @Descricao, @CargaHoraria, @DataCriacao, @Valor, @Categoria::categoria_enum, @Ativo, @ProfessorId)
                  RETURNING id;", new { 
                    curso.Nome, 
                    curso.Descricao, 
                    curso.CargaHoraria, 
                    curso.DataCriacao, 
                    curso.Valor, 
                    curso.Categoria,
                    curso.Ativo,
                    curso.ProfessorId
                }
            );
        }

        public async Task UpdateCurso(Curso curso)
        {
            await _context.CreateConnection().ExecuteAsync(
                @"UPDATE cursos SET
                    nome = @Nome,
                    descricao = @Descricao,
                    carga_horaria = @CargaHoraria,
                    data_criacao = @DataCriacao,
                    valor = @Valor,
                    categoria = @Categoria::categoria_enum,
                    professor_id = @ProfessorId,
                    ativo = @Ativo
                  WHERE id = @Id;",
                new
                {
                    curso.Id,
                    curso.Nome,
                    curso.Descricao,
                    curso.CargaHoraria,
                    curso.DataCriacao,
                    curso.Valor,
                    curso.Categoria,
                    curso.ProfessorId,
                    curso.Ativo
                }
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
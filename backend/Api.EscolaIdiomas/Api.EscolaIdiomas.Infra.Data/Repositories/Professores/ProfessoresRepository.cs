using Api.EscolaIdiomas.Domain.Interfaces.Professores;
using Api.EscolaIdiomas.Domain.Models.Professores;
using Api.EscolaIdiomas.Infra.Data.DatabaseConfiguration;
using Dapper;

namespace Api.EscolaIdiomas.Infra.Data.Repositories.Professores
{
    public class ProfessoresRepository : IProfessoresRepository
    {
        private readonly DatabaseContext _context;

        public ProfessoresRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Professor> GetProfessorById(long id)
        {
            return await _context.CreateConnection()
                .QueryFirstOrDefaultAsync<Professor>(@"
                    SELECT id,
                           nome,
                           sobrenome,
                           email,
                           formacao,
                           data_de_nascimento AS DataDeNascimento,
                           data_contratacao AS DataContratacao,
                           ativo
                    FROM professores WHERE id = @id
                ", new { id });
        }

        public async Task<IEnumerable<Professor>> GetProfessores()
        {
            return await _context.CreateConnection()
                .QueryAsync<Professor>(@"SELECT id, nome FROM professores ORDER BY nome");
        }

        public async Task<long> InsertProfessor(Professor professor)
        {
            return await _context.CreateConnection()
                .QueryFirstOrDefaultAsync<long>(
                    @"INSERT INTO professores
                        (
                          nome,
                          sobrenome,
                          email,
                          formacao,
                          data_de_nascimento,
                          data_contratacao,
                          ativo
                        )
                        VALUES
                        (
                          @Nome,
                          @Sobrenome,
                          @Email,
                          @Formacao,
                          @DataDeNascimento,
                          @DataContratacao,
                          @Ativo
                        ) RETURNING id;", professor);
        }

       

        public async Task UpdateProfessor(Professor professor)
        {
            await _context.CreateConnection()
                .ExecuteAsync(
                    @"UPDATE professores SET
                        email = @Email,
                        formacao = @Formacao,
                        ativo = @Ativo
                      WHERE id = @Id", professor);
        }

        public async Task DeleteProfessor(long id)
        {
            await _context.CreateConnection()
                .ExecuteAsync(@"DELETE FROM professores WHERE id = @Id", new { Id = id });
        }
    }
}
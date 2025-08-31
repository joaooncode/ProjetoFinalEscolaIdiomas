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
                           telefone,
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
                .QueryAsync<Professor>(@"SELECT id, nome, sobrenome, email, formacao, telefone, data_de_nascimento AS DataDeNascimento, data_contratacao AS DataContratacao, ativo FROM professores ORDER BY nome");
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
                          telefone,
                          data_de_nascimento,
                          data_contratacao,
                          ativo
                        )
                        VALUES
                        (
                          @Nome,
                          @Sobrenome,
                          @Email,
                          @Formacao::formacao_enum,
                          @Telefone,
                          @DataDeNascimento,
                          @DataContratacao,
                          @Ativo
                        ) RETURNING id;", new
                    {
                        professor.Nome,
                        professor.Sobrenome,
                        professor.Email,
                        Formacao = professor.Formacao.ToString(), // Converter enum para string
                        professor.Telefone,
                        professor.DataDeNascimento,
                        professor.DataContratacao,
                        professor.Ativo
                    });
        }



        public async Task UpdateProfessor(Professor professor)
        {
            await _context.CreateConnection()
                .ExecuteAsync(
                    @"UPDATE professores SET
                        email = @Email,
                        formacao = @Formacao::formacao_enum,
                        ativo = @Ativo
                      WHERE id = @Id", new
                    {
                        professor.Email,
                        Formacao = professor.Formacao.ToString(), // Converter enum para string
                        professor.Ativo
                    });
        }

        public async Task DeleteProfessor(long id)
        {
            await _context.CreateConnection()
                .ExecuteAsync(@"DELETE FROM professores WHERE id = @Id", new { Id = id });
        }
    }
}
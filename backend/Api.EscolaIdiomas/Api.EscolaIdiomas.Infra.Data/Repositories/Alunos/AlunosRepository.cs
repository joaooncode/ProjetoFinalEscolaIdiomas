using Api.EscolaIdiomas.Domain.Interfaces.Alunos;
using Api.EscolaIdiomas.Domain.Models.Alunos;
using Api.EscolaIdiomas.Infra.Data.DatabaseConfiguration;
using Dapper;

namespace Api.EscolaIdiomas.Infra.Data.Repositories.Alunos
{
    public class AlunosRepository : IAlunosRepository
    {
        private readonly DatabaseContext _context;

        public AlunosRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task DeleteAluno(long id)
        {
            await _context.CreateConnection().QueryFirstOrDefaultAsync(@"DELETE  FROM alunos WHERE id = @Id", new { Id = id });
        }

        public async Task<Aluno> GetAlunoById(long id)
        {
#pragma warning disable CS8603 // Possível retorno de referência nula.
            return await _context.CreateConnection()
                .QueryFirstOrDefaultAsync<Aluno>(@"
                    SELECT id,
                            nome,
                            sobrenome,
                            data_de_nascimento AS DataDeNascimento,
                            email,
                            telefone,
                            data_matricula AS DataMatricula,
                            ativo
                    FROM alunos WHERE id = @id
                ", new {id = id});
#pragma warning restore CS8603 // Possível retorno de referência nula.
        }

        public async Task<IEnumerable<Aluno>> GetAlunos()
        {
            return await _context.CreateConnection()
                .QueryAsync<Aluno>(@"
                    SELECT id,
                           nome,
                           sobrenome,
                           data_de_nascimento AS DataDeNascimento,
                           email,
                           telefone,
                           data_matricula AS DataMatricula,
                           ativo
                    FROM alunos 
                    ORDER BY nome");
        }

        public async Task<long> InsertAluno(Aluno aluno)
        {
            return await _context.CreateConnection()
                .QueryFirstOrDefaultAsync<long>(
                    @"INSERT INTO alunos
                       (
                          nome,
                          sobrenome,
                          data_de_nascimento,
                          email,
                          telefone,
                          data_matricula,
                          ativo
                        )
                        VALUES
                        (
                            @Nome,
                            @Sobrenome,
                            @DataDeNascimento,
                            @Email,
                            @Telefone,
                            @DataMatricula,
                            @Ativo
                        ) RETURNING id;", aluno);
        }

        public async Task UpdateAluno(Aluno aluno)
        {
            await _context.CreateConnection()
                .QueryFirstOrDefaultAsync<Aluno>(
                    @"UPDATE alunos SET
                      telefone = @Telefone,   
                      email = @Email
                       WHERE id = @Id", new
                    {
                        Telefone = aluno.Telefone,
                        Email  = aluno.Email,
                        Id = aluno.Id
                    });
        }
    }
}

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

        public async Task<Aluno> GetAlunoById(long id)
        {
            return await _context.CreateConnection()
                .QueryFirstOrDefaultAsync<Aluno>(@"
                    SELECT id,
                            nome,
                            sobrenome,
                            data_de_nascimento,
                            email,
                            telefone,
                            data_matricula,
                            ativo
                    FROM alunos WHERE id = @id
                ", new {id = id});
        }

        public async Task<IEnumerable<Aluno>> GetAlunos()
        {
            return await _context.CreateConnection()
                .QueryAsync<Aluno>(@"SELECT id, nome FROM alunos ORDER BY nome");
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
    }
}

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

        public async Task<IEnumerable<Aluno>> GetAlunos()
        {
            return await _context.CreateConnection()
                .QueryAsync<Aluno>(@"SELECT id, nome FROM alunos ORDER BY nome");
        }

    }
}

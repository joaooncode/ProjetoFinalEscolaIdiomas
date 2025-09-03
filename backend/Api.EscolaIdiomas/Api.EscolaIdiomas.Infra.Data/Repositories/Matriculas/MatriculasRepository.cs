using Api.EscolaIdiomas.Domain.Interfaces.Matriculas;
using Api.EscolaIdiomas.Domain.Models.Matriculas;
using Api.EscolaIdiomas.Domain.Models.Alunos;
using Api.EscolaIdiomas.Domain.Models.Cursos;
using Api.EscolaIdiomas.Infra.Data.DatabaseConfiguration;
using Dapper;

namespace Api.EscolaIdiomas.Infra.Data.Repositories.Matriculas
{
    public class MatriculasRepository : IMatriculasRepository
    {
        private readonly DatabaseContext _context;

        public MatriculasRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Matricula>> GetMatriculas()
        {
            return await _context.CreateConnection()
                .QueryAsync<Matricula, Aluno, Curso, Matricula>(@"
                    SELECT 
                        m.id,
                        m.aluno_id AS AlunoId,
                        m.curso_id AS CursoId,
                        m.data_matricula AS DataMatricula,
                        m.data_conclusao AS DataConclusao,
                        m.status,
                        m.nota_final AS NotaFinal,
                        m.ativo,
                        a.id,
                        a.nome,
                        a.sobrenome,
                        a.data_de_nascimento AS DataDeNascimento,
                        a.email,
                        a.telefone,
                        a.data_matricula AS DataMatricula,
                        a.ativo,
                        c.id,
                        c.nome,
                        c.descricao,
                        c.categoria,
                        c.valor,
                        c.carga_horaria,
                        c.professor_id,
                        c.ativo
                    FROM matriculas m
                    INNER JOIN alunos a ON m.aluno_id = a.id
                    INNER JOIN cursos c ON m.curso_id = c.id
                    ORDER BY m.data_matricula DESC",
                    (matricula, aluno, curso) =>
                    {
                        matricula.Aluno = aluno;
                        matricula.Curso = curso;
                        return matricula;
                    },
                    splitOn: "id,id");
        }

        public async Task<Matricula?> GetMatriculaById(long id)
        {
            var result = await _context.CreateConnection()
                .QueryAsync<Matricula, Aluno, Curso, Matricula>(@"
                    SELECT 
                        m.id,
                        m.aluno_id AS AlunoId,
                        m.curso_id AS CursoId,
                        m.data_matricula AS DataMatricula,
                        m.data_conclusao AS DataConclusao,
                        m.status,
                        m.nota_final AS NotaFinal,
                        m.ativo,
                        a.id,
                        a.nome,
                        a.sobrenome,
                        a.data_de_nascimento AS DataDeNascimento,
                        a.email,
                        a.telefone,
                        a.data_matricula AS DataMatricula,
                        a.ativo,
                        c.id,
                        c.nome,
                        c.descricao,
                        c.categoria,
                        c.valor,
                        c.carga_horaria,
                        c.professor_id,
                        c.ativo
                    FROM matriculas m
                    INNER JOIN alunos a ON m.aluno_id = a.id
                    INNER JOIN cursos c ON m.curso_id = c.id
                    WHERE m.id = @id",
                    (matricula, aluno, curso) =>
                    {
                        matricula.Aluno = aluno;
                        matricula.Curso = curso;
                        return matricula;
                    },
                    new { id },
                    splitOn: "id,id");

            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Matricula>> GetMatriculasByAlunoId(long alunoId)
        {
            return await _context.CreateConnection()
                .QueryAsync<Matricula, Aluno, Curso, Matricula>(@"
                    SELECT 
                        m.id,
                        m.aluno_id AS AlunoId,
                        m.curso_id AS CursoId,
                        m.data_matricula AS DataMatricula,
                        m.data_conclusao AS DataConclusao,
                        m.status,
                        m.nota_final AS NotaFinal,
                        m.ativo,
                        a.id,
                        a.nome,
                        a.sobrenome,
                        a.data_de_nascimento AS DataDeNascimento,
                        a.email,
                        a.telefone,
                        a.data_matricula AS DataMatricula,
                        a.ativo,
                        c.id,
                        c.nome,
                        c.descricao,
                        c.categoria,
                        c.valor,
                        c.carga_horaria,
                        c.professor_id,
                        c.ativo
                    FROM matriculas m
                    INNER JOIN alunos a ON m.aluno_id = a.id
                    INNER JOIN cursos c ON m.curso_id = c.id
                    WHERE m.aluno_id = @alunoId
                    ORDER BY m.data_matricula DESC",
                    (matricula, aluno, curso) =>
                    {
                        matricula.Aluno = aluno;
                        matricula.Curso = curso;
                        return matricula;
                    },
                    new { alunoId },
                    splitOn: "id,id");
        }

        public async Task<IEnumerable<Matricula>> GetMatriculasByCursoId(long cursoId)
        {
            return await _context.CreateConnection()
                .QueryAsync<Matricula, Aluno, Curso, Matricula>(@"
                    SELECT 
                        m.id,
                        m.aluno_id AS AlunoId,
                        m.curso_id AS CursoId,
                        m.data_matricula AS DataMatricula,
                        m.data_conclusao AS DataConclusao,
                        m.status,
                        m.nota_final AS NotaFinal,
                        m.ativo,
                        a.id,
                        a.nome,
                        a.sobrenome,
                        a.data_de_nascimento AS DataDeNascimento,
                        a.email,
                        a.telefone,
                        a.data_matricula AS DataMatricula,
                        a.ativo,
                        c.id,
                        c.nome,
                        c.descricao,
                        c.categoria,
                        c.valor,
                        c.carga_horaria,
                        c.professor_id,
                        c.ativo
                    FROM matriculas m
                    INNER JOIN alunos a ON m.aluno_id = a.id
                    INNER JOIN cursos c ON m.curso_id = c.id
                    WHERE m.curso_id = @cursoId
                    ORDER BY m.data_matricula DESC",
                    (matricula, aluno, curso) =>
                    {
                        matricula.Aluno = aluno;
                        matricula.Curso = curso;
                        return matricula;
                    },
                    new { cursoId },
                    splitOn: "id,id");
        }

        public async Task<long> InsertMatricula(Matricula matricula)
        {
            return await _context.CreateConnection()
                .QueryFirstOrDefaultAsync<long>(@"
                    INSERT INTO matriculas
                    (
                        aluno_id,
                        curso_id,
                        data_matricula,
                        status,
                        ativo
                    )
                    VALUES
                    (
                        @AlunoId,
                        @CursoId,
                        @DataMatricula,
                        @Status,
                        @Ativo
                    ) RETURNING id;", matricula);
        }

        public async Task UpdateMatricula(Matricula matricula)
        {
            await _context.CreateConnection()
                .QueryFirstOrDefaultAsync<Matricula>(@"
                    UPDATE matriculas SET
                        data_conclusao = @DataConclusao,
                        status = @Status,
                        nota_final = @NotaFinal,
                        ativo = @Ativo
                    WHERE id = @Id", new
                    {
                        DataConclusao = matricula.DataConclusao,
                        Status = matricula.Status,
                        NotaFinal = matricula.NotaFinal,
                        Ativo = matricula.Ativo,
                        Id = matricula.Id
                    });
        }

        public async Task DeleteMatricula(long id)
        {
            await _context.CreateConnection()
                .QueryFirstOrDefaultAsync(@"DELETE FROM matriculas WHERE id = @Id", new { Id = id });
        }

        public async Task<bool> ExisteMatricula(long alunoId, long cursoId)
        {
            var count = await _context.CreateConnection()
                .QueryFirstOrDefaultAsync<int>(@"
                    SELECT COUNT(*) FROM matriculas 
                    WHERE aluno_id = @alunoId AND curso_id = @cursoId AND ativo = true", 
                    new { alunoId, cursoId });
            
            return count > 0;
        }
    }
}

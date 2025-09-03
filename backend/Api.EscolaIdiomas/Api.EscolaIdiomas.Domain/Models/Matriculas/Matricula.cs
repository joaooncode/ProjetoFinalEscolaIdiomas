using Api.EscolaIdiomas.Domain.Models.Alunos;
using Api.EscolaIdiomas.Domain.Models.Cursos;

namespace Api.EscolaIdiomas.Domain.Models.Matriculas
{
    public class Matricula
    {
        public long Id { get; set; }
        public long AlunoId { get; set; }
        public long CursoId { get; set; }
        public DateTime DataMatricula { get; set; }
        public DateTime? DataConclusao { get; set; }
        public string Status { get; set; } = "Ativa";
        public decimal? NotaFinal { get; set; }
        public bool Ativo { get; set; }
        
        // Propriedades de navegação (opcional, para facilitar consultas)
        public Aluno? Aluno { get; set; }
        public Curso? Curso { get; set; }
    }
}

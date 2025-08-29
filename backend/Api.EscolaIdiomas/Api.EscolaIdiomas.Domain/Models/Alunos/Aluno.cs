namespace Api.EscolaIdiomas.Domain.Models.Alunos
{
    public class Aluno
    {
        public long Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        public string? Sobrenome { get; set; }

        public DateTime? DataDeNascimento { get; set; }

        public string? Email { get; set; }

        public string? Telefone { get; set; }

        public DateTime? DataMatricula { get; set; }

        public bool Ativo { get; set; }
    }
}

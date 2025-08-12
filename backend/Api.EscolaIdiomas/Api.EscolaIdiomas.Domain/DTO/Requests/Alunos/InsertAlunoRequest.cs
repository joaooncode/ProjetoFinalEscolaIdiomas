namespace Api.EscolaIdiomas.Domain.DTO.Requests.Alunos
{
    public class InsertAlunoRequest
    {
        public string Nome { get; set; }

        public string Sobrenome { get; set; }

        public DateTime DataDeNascimento { get; set; }

        public string Email { get; set; }

        public string Telefone { get; set; }

        public DateTime DataMatricula { get; set; }

        public bool Ativo { get; set; }
    }
}

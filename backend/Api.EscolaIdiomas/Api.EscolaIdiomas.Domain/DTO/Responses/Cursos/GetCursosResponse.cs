

namespace Api.EscolaIdiomas.Domain.DTO.Responses.Cursos
{
    public class GetCursosResponse
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public DateTime DataCriacao { get; set; }
        public string Categoria { get; set; }
        public decimal Valor { get; set; }
        public int CargaHoraria { get; set; }
        public long ProfessorId { get; set; }
        public string NomeProfessor { get; set; }
        public string SobrenomeProfessor { get; set; }
        public bool Ativo { get; set; }
    }
}

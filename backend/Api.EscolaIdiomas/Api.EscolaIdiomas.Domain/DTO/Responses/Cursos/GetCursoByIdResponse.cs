using Api.EscolaIdiomas.Domain.Models.Enums;

namespace Api.EscolaIdiomas.Domain.DTO.Responses.Cursos
{
    public class GetCursoByIdResponse
    {
        public string Nome { get; set; }

        public string Descricao { get; set; }

        public DateTime DataCriacao { get; set; }

        public Categorias Categoria { get; set; }

        public decimal Valor { get; set; }

        public int CargaHorario { get; set; }

        public long ProfessorId { get; set; }

        public bool Ativo { get; set; }
    }
}

namespace Api.EscolaIdiomas.Domain.DTO.Responses.Matriculas
{
    public class GetMatriculaByIdResponse
    {
        public long Id { get; set; }
        public long AlunoId { get; set; }
        public string AlunoNome { get; set; } = string.Empty;
        public string AlunoSobrenome { get; set; } = string.Empty;
        public long CursoId { get; set; }
        public string CursoNome { get; set; } = string.Empty;
        public DateTime DataMatricula { get; set; }
        public DateTime? DataConclusao { get; set; }
        public string Status { get; set; } = string.Empty;
        public decimal? NotaFinal { get; set; }
        public bool Ativo { get; set; }
    }
}

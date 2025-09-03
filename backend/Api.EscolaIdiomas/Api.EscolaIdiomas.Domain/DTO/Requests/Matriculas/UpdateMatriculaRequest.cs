namespace Api.EscolaIdiomas.Domain.DTO.Requests.Matriculas
{
    public class UpdateMatriculaRequest
    {
        public DateTime? DataConclusao { get; set; }
        public string? Status { get; set; }
        public decimal? NotaFinal { get; set; }
        public bool? Ativo { get; set; }
    }
}

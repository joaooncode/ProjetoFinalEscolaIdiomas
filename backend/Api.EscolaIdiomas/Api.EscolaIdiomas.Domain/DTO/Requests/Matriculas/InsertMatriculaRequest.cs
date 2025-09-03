namespace Api.EscolaIdiomas.Domain.DTO.Requests.Matriculas
{
    public class InsertMatriculaRequest
    {
        public long AlunoId { get; set; }
        public long CursoId { get; set; }
        public DateTime? DataMatricula { get; set; }
        public string? Status { get; set; } = "Ativa";
        public bool Ativo { get; set; } = true;
    }
}

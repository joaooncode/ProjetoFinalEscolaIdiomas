namespace Api.EscolaIdiomas.Domain.DTO.Responses.Matriculas
{
    public class InsertMatriculaResponse
    {
        public long Id { get; set; }
        public string Mensagem { get; set; } = "Matrícula realizada com sucesso!";
    }
}

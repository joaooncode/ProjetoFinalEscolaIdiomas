using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.EscolaIdiomas.Domain.DTO.Requests.Professores;
using Api.EscolaIdiomas.Domain.DTO.Responses.Professores;

namespace Api.EscolaIdiomas.Domain.Interfaces.Professores
{
    public interface IProfessoresService
    {
        Task<GetProfessoresByIdResponse> GetProfessoresById(long id);
        Task<IEnumerable<GetProfessoresResponse>> GetProfessores();
        Task<InsertProfessoresResponse> InsertProfessor(InsertProfessoresRequest request);
    }
}

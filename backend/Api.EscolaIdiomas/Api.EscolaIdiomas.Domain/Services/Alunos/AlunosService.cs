using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.EscolaIdiomas.Domain.DTO.Responses.Alunos;
using Api.EscolaIdiomas.Domain.Interfaces.Alunos;

namespace Api.EscolaIdiomas.Domain.Services.Alunos
{
    public class AlunosService : IAlunosService
    {
        public Task<IEnumerable<GetAlunosResponse>> GetAlunos()
        {
            throw new NotImplementedException();
        }
    }
}

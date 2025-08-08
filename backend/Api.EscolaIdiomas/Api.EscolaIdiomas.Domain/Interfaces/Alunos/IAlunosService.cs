using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.EscolaIdiomas.Domain.DTO.Responses.Alunos;

namespace Api.EscolaIdiomas.Domain.Interfaces.Alunos
{
    public interface IAlunosService
    {
        Task <IEnumerable<GetAlunosResponse>>GetAlunos();
    }
}

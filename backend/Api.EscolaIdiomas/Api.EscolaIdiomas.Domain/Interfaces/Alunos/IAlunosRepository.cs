using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.EscolaIdiomas.Domain.Models.Alunos;

namespace Api.EscolaIdiomas.Domain.Interfaces.Alunos
{
    public interface IAlunosRepository
    {
        Task<IEnumerable<Aluno>> GetAlunos();
    }
}

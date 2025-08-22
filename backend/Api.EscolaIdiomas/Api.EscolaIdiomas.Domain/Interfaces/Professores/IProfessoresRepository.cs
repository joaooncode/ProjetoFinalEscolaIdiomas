using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.EscolaIdiomas.Domain.Models.Professores;

namespace Api.EscolaIdiomas.Domain.Interfaces.Professores
{
    public interface IProfessoresRepository
    {
        Task<IEnumerable<Professor>> GetProfessores();

        Task<Professor> GetProfessorById(long id);

        Task<long> InsertProfessor(Professor professor);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.EscolaIdiomas.Domain.Models.Alunos
{
    public interface Aluno
    {
        public long Id { get; set; }

        public string Nome { get; set; }

        public string Sobrenome { get; set; }

        public DateTime DataDeNascimento { get; set; }

        public string Email { get; set; }

        public string Telefone { get; set; }

        public DateTime DataMatricula { get; set; }

        public bool Ativo { get; set; }
    }
}

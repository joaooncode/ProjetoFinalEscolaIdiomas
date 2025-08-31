using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.EscolaIdiomas.Domain.DTO.Responses.Professores
{
    public class GetProfessoresResponse
    {
        public long Id { get; set; }

        public string Nome { get; set; }
        
        public string Sobrenome { get; set; }

        public string Email { get; set; }

        public string Formacao { get; set; }

        public string Telefone { get; set; }

        public DateTime DataDeNascimento { get; set; }

        public DateTime DataContratacao { get; set; }

        public bool Ativo { get; set; }
    }
}

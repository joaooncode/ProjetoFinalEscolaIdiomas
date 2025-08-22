using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.EscolaIdiomas.Domain.Models.Enums;

namespace Api.EscolaIdiomas.Domain.DTO.Responses.Professores
{
    public class GetProfessoresByIdResponse
    {
        public long Id { get; set; }

        public string Nome { get; set; }

        public string Sobrenome { get; set; }

        public string Email { get; set; }

        public Formacoes Formacao { get; set; }

        public DateTime DataDeNascimento { get; set; }

        public DateTime DataContratacao { get; set; }

        public bool Ativo { get; set; }
    }
}

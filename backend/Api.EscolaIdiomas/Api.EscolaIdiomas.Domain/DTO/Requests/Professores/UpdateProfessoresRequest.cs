using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.EscolaIdiomas.Domain.Models.Enums;

namespace Api.EscolaIdiomas.Domain.DTO.Requests.Professores
{
    public class UpdateProfessoresRequest
    {
        public string Telefone { get; set; }

        public string Email { get; set; }

        public Formacoes Formacao { get; set; }
    }
}

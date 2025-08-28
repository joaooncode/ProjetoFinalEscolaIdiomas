using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.EscolaIdiomas.Domain.Models.Enums;

namespace Api.EscolaIdiomas.Domain.Models.Cursos
{
    public class Curso
    {
        public long Id { get; set; }

        public string  Nome { get; set; }

        public string Descricao { get; set; }

        public DateTime DataCriacao { get; set; }

        public Categorias Categoria { get; set; }

        public decimal Valor { get; set; }

        public int CargaHoraria { get; set; }

        public long ProfessorId { get; set; }
        
        public bool Ativo {  get; set; }
    }
}

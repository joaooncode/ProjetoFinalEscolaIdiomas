using Api.EscolaIdiomas.Domain.DTO.Requests.Cursos;
using Api.EscolaIdiomas.Domain.DTO.Responses.Cursos;
using Api.EscolaIdiomas.Domain.Interfaces.Cursos;
using Api.EscolaIdiomas.Domain.Models.Cursos;
using System.Linq;


namespace Api.EscolaIdiomas.Domain.Services.Cursos
{
    public class CursosService : ICursosService
    {
        private readonly ICursosRepository _cursosRepository;

        private string MapCategoriaToDatabase(string categoria)
        {
            return categoria switch
            {
                "Básico" => "Basico",
                "Médio" => "Medio", 
                "Avançado" => "Avancado",
                "Basico" => "Basico",
                "Medio" => "Medio",
                "Avancado" => "Avancado",
                _ => throw new ArgumentException($"Categoria inválida: {categoria}")
            };
        }

        private string MapCategoriaFromDatabase(string categoria)
        {
            return categoria switch
            {
                "Basico" => "Básico",
                "Medio" => "Médio",
                "Avancado" => "Avançado",
                _ => categoria // Retorna o valor original se não encontrar mapeamento
            };
        }
        

        public CursosService(ICursosRepository cursosRepository)
        {
            _cursosRepository = cursosRepository;
        }

        public async Task<GetCursoByIdResponse> GetCursoById(long id)
        {
            var curso = await _cursosRepository.GetCursoById(id);

            
            if (curso == null)
            {
                return null;
            }

            
            return new GetCursoByIdResponse
            {
                Id = curso.Id,
                Nome = curso.Nome,
                Descricao = curso.Descricao,
                CargaHoraria = curso.CargaHoraria,
                Valor = curso.Valor,
                Categoria = MapCategoriaFromDatabase(curso.Categoria),
                DataCriacao = curso.DataCriacao,
                ProfessorId = curso.ProfessorId,
                NomeProfessor = curso.NomeProfessor,
                SobrenomeProfessor = curso.SobrenomeProfessor,
                Ativo = curso.Ativo
            };
        }

        public async Task<IEnumerable<GetCursosResponse>> GetCursos()
        {
            var cursos = await _cursosRepository.GetCursos();

            if (cursos == null || !cursos.Any())
            {
                
                return Enumerable.Empty<GetCursosResponse>();
            }

            
            var response = cursos.Select(c => new GetCursosResponse 
            { 
                Id = c.Id, 
                Nome = c.Nome,
                Descricao = c.Descricao,
                DataCriacao = c.DataCriacao,
                Categoria = MapCategoriaFromDatabase(c.Categoria),
                Valor = c.Valor,
                CargaHoraria = c.CargaHoraria,
                ProfessorId = c.ProfessorId,
                NomeProfessor = c.NomeProfessor,
                SobrenomeProfessor = c.SobrenomeProfessor,
                Ativo = c.Ativo
            });

            return response;
        }

        

        public async Task<InsertCursoResponse> InsertCurso(InsertCursoRequest request)
        {
            var curso = new Curso
            {
                Nome = request.Nome,
                Descricao = request.Descricao,
                CargaHoraria = request.CargaHoraria,
                Valor = request.Valor,
                Ativo = request.Ativo,
                Categoria = MapCategoriaToDatabase(request.Categoria),
                ProfessorId = request.ProfessorId,
                DataCriacao = request.DataCriacao
            };


            var newId = await _cursosRepository.InsertCurso(curso);

            return new InsertCursoResponse { Id = newId };
        }

        public async Task UpdateCurso(long id, UpdateCursoRequest request)
        {
            var curso = await _cursosRepository.GetCursoById(id);

            if (curso == null)
            {
                throw new Exception($"Não foi possível encontrar um curso com o id {id}");
            }

            
            curso.Nome = request.Nome;
            curso.Descricao = request.Descricao;
            curso.CargaHoraria = request.CargaHoraria;
            curso.Valor = request.Valor;
            curso.Ativo = request.Ativo;
            curso.Categoria = MapCategoriaToDatabase(request.Categoria);
            curso.ProfessorId = request.ProfessorId;

            await _cursosRepository.UpdateCurso(curso);
        }

        public async Task DeleteCurso(long id)
        {
            var curso = await _cursosRepository.GetCursoById(id);

            if (curso == null)
            {
                throw new Exception($"Nenhum curso encontrado com o id: {id}");
            }

            await _cursosRepository.DeleteCurso(id);
        }
    }
}
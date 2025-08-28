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

            
            var response = cursos.Select(c => new GetCursosResponse { Id = c.Id, Nome = c.Nome });

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
                Ativo = request.Ativo
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
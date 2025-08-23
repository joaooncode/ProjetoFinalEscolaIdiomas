using Api.EscolaIdiomas.Domain.DTO.Responses.Cursos;
using Api.EscolaIdiomas.Domain.Interfaces.Cursos;

namespace Api.EscolaIdiomas.Domain.Services.Cursos
{
    public class CursosService : ICursosService
    {

        private readonly ICursosRepository _cursosRepository;

        public CursosService(ICursosRepository cursosRepository)
        {
            _cursosRepository = cursosRepository;
        }

        public async Task GetCursoById(long id)
        {
            var curso = await _cursosRepository.GetCursoById(id);

            if (curso == null)
            {
                throw new Exception($"Nenum curso encontrado com o id : {id}");
            }
        }

        public async Task<IEnumerable<GetCursosResponse>> GetCursos()
        {
            var cursos = await _cursosRepository.GetCursos();

            if (cursos == null)
            {
                throw new Exception("Nenhum curso encontrado");
            }

            var response = cursos.Select(c => new GetCursosResponse { Nome = c.Nome });

            return response;
        }
    }
}

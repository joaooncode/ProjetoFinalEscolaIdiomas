using Api.EscolaIdiomas.Domain.DTO.Requests.Professores;
using Api.EscolaIdiomas.Domain.DTO.Responses.Professores;
using Api.EscolaIdiomas.Domain.Interfaces.Professores;
using Api.EscolaIdiomas.Domain.Models.Professores;

namespace Api.EscolaIdiomas.Domain.Services.Professores
{
    public class ProfessoresService : IProfessoresService
    {
        private readonly IProfessoresRepository _professoresRepository;

        public ProfessoresService(IProfessoresRepository professoresRepository)
        {
            _professoresRepository = professoresRepository;
        }

        public async Task<GetProfessoresByIdResponse> GetProfessoresById(long id)
        {
            var professor = await _professoresRepository.GetProfessorById(id);

            if (professor == null) return null;

            
            return new GetProfessoresByIdResponse()
            {
                Id = professor.Id,
                Nome = professor.Nome,
                Sobrenome = professor.Sobrenome,
                Email = professor.Email,
                Formacao = professor.Formacao,
                DataDeNascimento = professor.DataDeNascimento,
                DataContratacao = professor.DataContratacao,
                Ativo = professor.Ativo
            };
        }

        public async Task<IEnumerable<GetProfessoresResponse>> GetProfessores()
        {
            var professores = await _professoresRepository.GetProfessores();

            if (professores == null || !professores.Any())
            {
                
                return Enumerable.Empty<GetProfessoresResponse>();
            }

            
            var response = professores.Select(p => new GetProfessoresResponse { Id = p.Id, Nome = p.Nome });

            return response;
        }

        public async Task<InsertProfessoresResponse> InsertProfessor(InsertProfessoresRequest request)
        {
            try
            {
                
                var professor = new Professor()
                {
                    Nome = request.Nome,
                    Sobrenome = request.Sobrenome,
                    Email = request.Email,
                    Formacao = request.Formacao,
                    DataDeNascimento = request.DataDeNascimento,
                    DataContratacao = request.DataContratacao,
                    Ativo = request.Ativo
                };

                
                var novoId = await _professoresRepository.InsertProfessor(professor);

                
                var response = new InsertProfessoresResponse()
                {
                    Id = novoId
                };

                return response;
            }
            catch (Exception)
            {
                
                throw;
            }
        }
    }
}
using Api.EscolaIdiomas.Domain.DTO.Requests.Professores;
using Api.EscolaIdiomas.Domain.DTO.Responses.Professores;
using Api.EscolaIdiomas.Domain.Interfaces.Professores;
using Api.EscolaIdiomas.Domain.Models.Enums;
using Api.EscolaIdiomas.Domain.Models.Professores;
using System.Linq;

namespace Api.EscolaIdiomas.Domain.Services.Professores
{
    public class ProfessoresService : IProfessoresService
    {
        private readonly IProfessoresRepository _professoresRepository;

        private Formacoes MapFormacaoStringEnum(string formacaoString)
        {
            return formacaoString switch
            {
                "Ensino Médio" => Formacoes.EnsinoMedio,
                "Ensino Técnico" => Formacoes.EnsinoTecnico,
                "Graduado" => Formacoes.Graduado,
                "Pós-Graduado" => Formacoes.PosGraduado,
                "Mestrado" => Formacoes.Mestrado,
                "Doutorado" => Formacoes.Doutorado,
                _ => throw new ArgumentException($"Formação inválida: {formacaoString}")
            };
        }

        public ProfessoresService(IProfessoresRepository professoresRepository)
        {
            _professoresRepository = professoresRepository;
        }

        public async Task DeleteProfessor(long id)
        {
            var professor = await _professoresRepository.GetProfessorById(id);

            if (professor == null)
            {
                throw new Exception($"Nenhum professor encontrado com id: {id}");
            }

            await _professoresRepository.DeleteProfessor(id);
        }

        public async Task<GetProfessoresByIdResponse> GetProfessorById(long id)
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
                Ativo = professor.Ativo,
            };
        }

        public async Task<IEnumerable<GetProfessoresResponse>> GetProfessores()
        {
            var professores = await _professoresRepository.GetProfessores();

            if (professores == null || !professores.Any())
            {
                
                return Enumerable.Empty<GetProfessoresResponse>();
            }

            var response = professores.Select(p => new GetProfessoresResponse 
            { 
                Id = p.Id,
                Nome = p.Nome,
                Sobrenome = p.Sobrenome,
                Email = p.Email,
                Telefone = p.Telefone,
                Formacao = p.Formacao.ToString(),
                DataDeNascimento = p.DataDeNascimento,
                DataContratacao = p.DataContratacao,
                Ativo = p.Ativo
            });

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
                    Formacao = MapFormacaoStringEnum(request.Formacao),
                    Telefone = request.Telefone,
                    DataDeNascimento = request.DataDeNascimento,
                    DataContratacao = request.DataContratacao,
                    Ativo = request.Ativo
                };

                var newId = await _professoresRepository.InsertProfessor(professor);

                var newProfessor = new InsertProfessoresResponse()
                {
                    Id = newId
                };

                return newProfessor;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task UpdateProfessor(long id, UpdateProfessoresRequest request)
        {
            try
            {
                var professor = await _professoresRepository.GetProfessorById(id);

                if (professor == null)
                {
                    throw new Exception($"Não foi possível encontrar um professor com o id {id}");
                }

                
                professor.Email = request.Email;
                professor.Formacao = request.Formacao;
                

                await _professoresRepository.UpdateProfessor(professor);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao atualizar professor: {ex.Message}");
            }
        }
    }
}
using Api.EscolaIdiomas.Domain.DTO.Requests.Matriculas;
using Api.EscolaIdiomas.Domain.DTO.Responses.Matriculas;
using Api.EscolaIdiomas.Domain.Interfaces.Matriculas;
using Api.EscolaIdiomas.Domain.Models.Matriculas;

namespace Api.EscolaIdiomas.Domain.Services.Matriculas
{
    public class MatriculasService : IMatriculasService
    {
        private readonly IMatriculasRepository _matriculasRepository;

        public MatriculasService(IMatriculasRepository matriculasRepository)
        {
            _matriculasRepository = matriculasRepository;
        }

        public async Task<IEnumerable<GetMatriculasResponse>> GetMatriculas()
        {
            var matriculas = await _matriculasRepository.GetMatriculas();

            if (matriculas == null || !matriculas.Any())
            {
                throw new Exception("Nenhuma matrícula encontrada!");
            }

            var response = matriculas.Select(m => new GetMatriculasResponse
            {
                Id = m.Id,
                AlunoId = m.AlunoId,
                AlunoNome = m.Aluno?.Nome ?? "N/A",
                AlunoSobrenome = m.Aluno?.Sobrenome ?? "N/A",
                CursoId = m.CursoId,
                CursoNome = m.Curso?.Nome ?? "N/A",
                DataMatricula = m.DataMatricula,
                DataConclusao = m.DataConclusao,
                Status = m.Status,
                NotaFinal = m.NotaFinal,
                Ativo = m.Ativo
            });

            return response;
        }

        public async Task<GetMatriculaByIdResponse?> GetMatriculaById(long id)
        {
            var matricula = await _matriculasRepository.GetMatriculaById(id);

            if (matricula == null) return null;

            return new GetMatriculaByIdResponse
            {
                Id = matricula.Id,
                AlunoId = matricula.AlunoId,
                AlunoNome = matricula.Aluno?.Nome ?? "N/A",
                AlunoSobrenome = matricula.Aluno?.Sobrenome ?? "N/A",
                CursoId = matricula.CursoId,
                CursoNome = matricula.Curso?.Nome ?? "N/A",
                DataMatricula = matricula.DataMatricula,
                DataConclusao = matricula.DataConclusao,
                Status = matricula.Status,
                NotaFinal = matricula.NotaFinal,
                Ativo = matricula.Ativo
            };
        }

        public async Task<IEnumerable<GetMatriculasResponse>> GetMatriculasByAlunoId(long alunoId)
        {
            var matriculas = await _matriculasRepository.GetMatriculasByAlunoId(alunoId);

            if (matriculas == null || !matriculas.Any())
            {
                throw new Exception($"Nenhuma matrícula encontrada para o aluno com ID {alunoId}!");
            }

            var response = matriculas.Select(m => new GetMatriculasResponse
            {
                Id = m.Id,
                AlunoId = m.AlunoId,
                AlunoNome = m.Aluno?.Nome ?? "N/A",
                AlunoSobrenome = m.Aluno?.Sobrenome ?? "N/A",
                CursoId = m.CursoId,
                CursoNome = m.Curso?.Nome ?? "N/A",
                DataMatricula = m.DataMatricula,
                DataConclusao = m.DataConclusao,
                Status = m.Status,
                NotaFinal = m.NotaFinal,
                Ativo = m.Ativo
            });

            return response;
        }

        public async Task<IEnumerable<GetMatriculasResponse>> GetMatriculasByCursoId(long cursoId)
        {
            var matriculas = await _matriculasRepository.GetMatriculasByCursoId(cursoId);

            if (matriculas == null || !matriculas.Any())
            {
                throw new Exception($"Nenhuma matrícula encontrada para o curso com ID {cursoId}!");
            }

            var response = matriculas.Select(m => new GetMatriculasResponse
            {
                Id = m.Id,
                AlunoId = m.AlunoId,
                AlunoNome = m.Aluno?.Nome ?? "N/A",
                AlunoSobrenome = m.Aluno?.Sobrenome ?? "N/A",
                CursoId = m.CursoId,
                CursoNome = m.Curso?.Nome ?? "N/A",
                DataMatricula = m.DataMatricula,
                DataConclusao = m.DataConclusao,
                Status = m.Status,
                NotaFinal = m.NotaFinal,
                Ativo = m.Ativo
            });

            return response;
        }

        public async Task<InsertMatriculaResponse> InsertMatricula(InsertMatriculaRequest request)
        {
            try
            {
                // Verificar se já existe uma matrícula ativa para este aluno neste curso
                var existeMatricula = await _matriculasRepository.ExisteMatricula(request.AlunoId, request.CursoId);
                if (existeMatricula)
                {
                    throw new Exception("Aluno já está matriculado neste curso!");
                }

                var matricula = new Matricula
                {
                    AlunoId = request.AlunoId,
                    CursoId = request.CursoId,
                    DataMatricula = request.DataMatricula ?? DateTime.Now,
                    Status = request.Status ?? "Ativa",
                    Ativo = request.Ativo
                };

                var id = await _matriculasRepository.InsertMatricula(matricula);

                return new InsertMatriculaResponse
                {
                    Id = id,
                    Mensagem = "Matrícula realizada com sucesso!"
                };
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task UpdateMatricula(long id, UpdateMatriculaRequest request)
        {
            try
            {
                var matricula = await _matriculasRepository.GetMatriculaById(id);

                if (matricula == null)
                {
                    throw new Exception($"Não foi possível encontrar uma matrícula com o ID {id}");
                }

                if (request.DataConclusao.HasValue)
                    matricula.DataConclusao = request.DataConclusao.Value;
                
                if (!string.IsNullOrEmpty(request.Status))
                    matricula.Status = request.Status;
                
                if (request.NotaFinal.HasValue)
                    matricula.NotaFinal = request.NotaFinal.Value;
                
                if (request.Ativo.HasValue)
                    matricula.Ativo = request.Ativo.Value;

                await _matriculasRepository.UpdateMatricula(matricula);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao atualizar matrícula: {ex.Message}");
            }
        }

        public async Task DeleteMatricula(long id)
        {
            var matricula = await _matriculasRepository.GetMatriculaById(id);

            if (matricula == null)
            {
                throw new Exception($"Nenhuma matrícula encontrada com ID: {id}");
            }

            await _matriculasRepository.DeleteMatricula(id);
        }
    }
}

import { useApi } from "../composable/api";
import type { CreateMatriculaFormData } from "../components/forms/schemas/matriculaSchema";
import type { Matricula, MatriculaResumo, CreateMatriculaRequest, UpdateMatriculaRequest } from "../types/Matricula";

// Interface para a resposta da API
export interface InsertMatriculaResponse {
  id: number;
}

// Interface para resposta de erro da API
export interface MatriculaError {
  mensagem: string;
  status: string;
}

// Hook personalizado para serviços de matrículas
export const useMatriculaService = () => {
  const { post, get, put, del, loading, error, clearError } = useApi();

  // Função para inserir uma nova matrícula
  const insertMatricula = async (
    data: CreateMatriculaFormData
  ): Promise<InsertMatriculaResponse> => {
    try {
      // Preparar dados para a API
      const requestData: CreateMatriculaRequest = {
        alunoId: data.alunoId,
        cursoId: data.cursoId,
        dataMatricula: data.dataMatricula.toISOString(),
        status: data.status,
        ativo: data.ativo,
      };

      // Fazer chamada para a API usando o composable
      const response = await post<InsertMatriculaResponse>("/matriculas", requestData);

      return response.data;
    } catch (error: unknown) {
      console.error("Erro ao cadastrar matrícula:", error);
      throw error;
    }
  };

  // Função para buscar todas as matrículas
  const getMatriculas = async (): Promise<MatriculaResumo[]> => {
    try {
      const response = await get("/matriculas");
      return response.data;
    } catch (error: unknown) {
      console.error("Erro ao buscar matrículas:", error);
      throw error;
    }
  };

  // Função para buscar matrícula por ID
  const getMatriculaById = async (id: number): Promise<Matricula> => {
    try {
      const response = await get(`/matriculas/${id}`);
      return response.data;
    } catch (error: unknown) {
      console.error(`Erro ao buscar matrícula com ID ${id}:`, error);
      throw error;
    }
  };

  // Função para buscar matrículas por aluno
  const getMatriculasByAluno = async (alunoId: number): Promise<MatriculaResumo[]> => {
    try {
      const response = await get(`/matriculas/aluno/${alunoId}`);
      return response.data;
    } catch (error: unknown) {
      console.error(`Erro ao buscar matrículas do aluno ${alunoId}:`, error);
      throw error;
    }
  };

  // Função para buscar matrículas por curso
  const getMatriculasByCurso = async (cursoId: number): Promise<MatriculaResumo[]> => {
    try {
      const response = await get(`/matriculas/curso/${cursoId}`);
      return response.data;
    } catch (error: unknown) {
      console.error(`Erro ao buscar matrículas do curso ${cursoId}:`, error);
      throw error;
    }
  };

  // Função para atualizar matrícula
  const updateMatricula = async (
    id: number,
    data: Partial<CreateMatriculaFormData>
  ): Promise<void> => {
    try {
      const requestData: UpdateMatriculaRequest = {
        dataConclusao: data.dataMatricula?.toISOString(),
        status: data.status,
        ativo: data.ativo,
      };

      await put(`/matriculas/${id}`, requestData);
    } catch (error: unknown) {
      console.error(`Erro ao atualizar matrícula com ID ${id}:`, error);
      throw error;
    }
  };

  // Função para deletar matrícula
  const deleteMatricula = async (id: number): Promise<void> => {
    try {
      await del(`/matriculas/${id}`);
    } catch (error: unknown) {
      console.error(`Erro ao deletar matrícula com ID ${id}:`, error);
      throw error;
    }
  };

  return {
    // Estados
    loading,
    error,
    clearError,

    // Métodos
    insertMatricula,
    getMatriculas,
    getMatriculaById,
    getMatriculasByAluno,
    getMatriculasByCurso,
    updateMatricula,
    deleteMatricula,
  };
};

// Funções utilitárias para uso direto (sem hook) - usando a instância da API diretamente
import { api } from "../composable/api";

export const matriculaService = {
  // Função para inserir matrícula sem usar hook
  insertMatricula: async (
    data: CreateMatriculaFormData
  ): Promise<InsertMatriculaResponse> => {
    const requestData: CreateMatriculaRequest = {
      alunoId: data.alunoId,
      cursoId: data.cursoId,
      dataMatricula: data.dataMatricula.toISOString(),
      status: data.status,
      ativo: data.ativo,
    };

    const response = await api.post<InsertMatriculaResponse>(
      "/matriculas",
      requestData
    );
    return response.data;
  },

  // Função para buscar todas as matrículas sem usar hook
  getMatriculas: async (): Promise<MatriculaResumo[]> => {
    const response = await api.get("/matriculas");
    return response.data;
  },

  // Função para buscar matrícula por ID sem usar hook
  getMatriculaById: async (id: number): Promise<Matricula> => {
    const response = await api.get(`/matriculas/${id}`);
    return response.data;
  },

  // Função para buscar matrículas por aluno sem usar hook
  getMatriculasByAluno: async (alunoId: number): Promise<MatriculaResumo[]> => {
    const response = await api.get(`/matriculas/aluno/${alunoId}`);
    return response.data;
  },

  // Função para buscar matrículas por curso sem usar hook
  getMatriculasByCurso: async (cursoId: number): Promise<MatriculaResumo[]> => {
    const response = await api.get(`/matriculas/curso/${cursoId}`);
    return response.data;
  },

  // Função para atualizar matrícula sem usar hook
  updateMatricula: async (
    id: number,
    data: Partial<CreateMatriculaFormData>
  ): Promise<void> => {
    const requestData: UpdateMatriculaRequest = {
      dataConclusao: data.dataMatricula?.toISOString(),
      status: data.status,
      ativo: data.ativo,
    };

    await api.put(`/matriculas/${id}`, requestData);
  },

  // Função para deletar matrícula sem usar hook
  deleteMatricula: async (id: number): Promise<void> => {
    await api.delete(`/matriculas/${id}`);
  },
};

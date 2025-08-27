import { useApi } from "../composable/api";
import type { CreateAlunoFormData } from "../components/forms/schemas/alunoSchema";

// Interface para a resposta da API
export interface InsertAlunoResponse {
  id: number;
}

// Interface para a requisição da API
export interface InsertAlunoRequest {
  nome: string;
  sobrenome: string;
  dataDeNascimento: string; // ISO date string
  email: string;
  telefone: string;
  dataMatricula: string; // ISO date string
  ativo: boolean;
}

// Interface para resposta de erro da API
export interface AlunoError {
  mensagem: string;
  status: string;
}

// Hook personalizado para serviços de alunos
export const useAlunosService = () => {
  const { post, get, put, del, loading, error, clearError } = useApi();

  // Função para inserir um novo aluno
  const insertAluno = async (data: CreateAlunoFormData): Promise<InsertAlunoResponse> => {
    try {
      // Preparar dados para a API
      const requestData: InsertAlunoRequest = {
        nome: data.nome,
        sobrenome: data.sobrenome,
        dataDeNascimento: data.dataDeNascimento.toISOString(),
        email: data.email,
        telefone: data.telefone,
        dataMatricula: new Date().toISOString(), // Data atual como data de matrícula
        ativo: data.ativo
      };

      console.log("Enviando dados para API:", requestData);

      // Fazer chamada para a API usando o composable
      const response = await post<InsertAlunoResponse>("/alunos", requestData);
      
      console.log("Aluno cadastrado com sucesso:", response.data);
      
      return response.data;
      
    } catch (error: any) {
      console.error("Erro ao cadastrar aluno:", error);
      
      // Re-throw o erro para ser tratado pelo componente
      throw error;
    }
  };

  // Função para buscar todos os alunos
  const getAlunos = async () => {
    try {
      const response = await get("/alunos");
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar alunos:", error);
      throw error;
    }
  };

  // Função para buscar aluno por ID
  const getAlunoById = async (id: number) => {
    try {
      const response = await get(`/alunos/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao buscar aluno com ID ${id}:`, error);
      throw error;
    }
  };

  // Função para atualizar aluno
  const updateAluno = async (id: number, data: Partial<CreateAlunoFormData>) => {
    try {
      const requestData = {
        ...data,
        dataDeNascimento: data.dataDeNascimento?.toISOString(),
      };

      const response = await put(`/alunos/${id}`, requestData);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao atualizar aluno com ID ${id}:`, error);
      throw error;
    }
  };

  // Função para deletar aluno
  const deleteAluno = async (id: number) => {
    try {
      const response = await del(`/alunos/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao deletar aluno com ID ${id}:`, error);
      throw error;
    }
  };

  return {
    // Estados
    loading,
    error,
    clearError,
    
    // Métodos
    insertAluno,
    getAlunos,
    getAlunoById,
    updateAluno,
    deleteAluno,
  };
};

// Funções utilitárias para uso direto (sem hook) - usando a instância da API diretamente
import { api } from "../composable/api";

export const alunosService = {
  // Função para inserir aluno sem usar hook
  insertAluno: async (data: CreateAlunoFormData): Promise<InsertAlunoResponse> => {
    const requestData: InsertAlunoRequest = {
      nome: data.nome,
      sobrenome: data.sobrenome,
      dataDeNascimento: data.dataDeNascimento.toISOString(),
      email: data.email,
      telefone: data.telefone,
      dataMatricula: new Date().toISOString(),
      ativo: data.ativo
    };

    const response = await api.post<InsertAlunoResponse>("/alunos", requestData);
    return response.data;
  },

  // Função para buscar todos os alunos sem usar hook
  getAlunos: async () => {
    const response = await api.get("/alunos");
    return response.data;
  },

  // Função para buscar aluno por ID sem usar hook
  getAlunoById: async (id: number) => {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
  },

  // Função para atualizar aluno sem usar hook
  updateAluno: async (id: number, data: Partial<CreateAlunoFormData>) => {
    const requestData = {
      ...data,
      dataDeNascimento: data.dataDeNascimento?.toISOString(),
    };

    const response = await api.put(`/alunos/${id}`, requestData);
    return response.data;
  },

  // Função para deletar aluno sem usar hook
  deleteAluno: async (id: number) => {
    const response = await api.delete(`/alunos/${id}`);
    return response.data;
  },
};

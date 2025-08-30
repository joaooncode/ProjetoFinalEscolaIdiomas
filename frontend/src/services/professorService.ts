import { useApi } from "../composable/api";
import type { CreateProfessorFormData } from "../components/forms/schemas/professorSchema";

export interface InsertProfessorResponse {
    id: number;
}

export interface InsertProfessorRequest {
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    formacao: string;
    dataDeNascimento: string;
    dataContratacao: string;
    ativo: boolean;
}

export interface ProfessorError {
    mensagem: string;
    status: string;
}

// Hook personalizado para serviços de professores
export const useProfessorService = () => {
    const { post, get, put, del, loading, error, clearError } = useApi();

    // Função para inserir um novo professor
    const insertProfessor = async (data: CreateProfessorFormData): Promise<InsertProfessorResponse> => {
        try {
            // Preparar dados para a API
            const requestData: InsertProfessorRequest = {
                nome: data.nome,
                sobrenome: data.sobrenome,
                email: data.email,
                telefone: data.telefone,
                formacao: data.formacao,
                dataDeNascimento: data.dataDeNascimento.toISOString(),
                dataContratacao: data.dataContratacao.toISOString(),
                ativo: data.ativo,
            }

            // Fazer chamada para a API usando o composable
            const response = await post<InsertProfessorResponse>("/professores", requestData);

            return response.data;
        } catch (error: unknown) {
            console.error("Erro ao cadastrar professor:", error);

            // Re-throw o erro para ser tratado pelo componente
            throw error;
        }
    }

    // Função para buscar todos os professores
    const getProfessores = async () => {
        try {
            const response = await get("/professores");
            return response.data;
        } catch (error: unknown) {
            console.error("Erro ao buscar professores:", error);
            throw error;
        }
    }

    // Função para buscar um professor por ID
    const getProfessorById = async (id: number) => {
        try {
            const response = await get(`/professores/${id}`);
            return response.data;
        } catch (error: unknown) {
            console.error(`Erro ao buscar professor com ID ${id}:`, error);
            throw error;
        }
    }

    // Função para atualizar um professor
    const updateProfessor = async (id: number, data: Partial<CreateProfessorFormData>) => {
        try {
            const requestData = {
                ...data,
                dataDeNascimento: data.dataDeNascimento?.toISOString(),
            }

            const response = await put(`/professores/${id}`, requestData);
            return response.data;
        } catch (error: unknown) {
            console.error(`Erro ao atualizar professor com ID ${id}:`, error);
            throw error;
        }
    }
    
    // Função para deletar um professor
    const deleteProfessor = async (id: number) => {
        try {
            const response = await del(`/professores/${id}`);
            return response.data;
        } catch (error: unknown) {
            console.error(`Erro ao deletar professor com ID ${id}:`, error);
            throw error;
        }
    }

    return {
        // Estados
        loading,
        error,
        clearError,

        // Métodos
        insertProfessor,
        getProfessores,
        getProfessorById,
        updateProfessor,
        deleteProfessor,
    }
}

// Funções utilitárias para uso direto (sem hook) - usando a instância da API diretamente
import { api } from "../composable/api";

export const professorService = {
    // Função para inserir professor sem usar hook
    insertProfessor: async (data: CreateProfessorFormData): Promise<InsertProfessorResponse> => {
        const requestData: InsertProfessorRequest = {
            nome: data.nome,
            sobrenome: data.sobrenome,
            email: data.email,
            telefone: data.telefone,
            formacao: data.formacao,
            dataDeNascimento: data.dataDeNascimento.toISOString(),
            dataContratacao: data.dataContratacao.toISOString(),
            ativo: data.ativo,
        }

        const response = await api.post<InsertProfessorResponse>("/professores", requestData);
        return response.data;
    },

    // Função para buscar todos os professores sem usar hook
    getProfessores: async () => {
        const response = await api.get("/professores");
        return response.data;
    },

    // Função para buscar professor por ID sem usar hook
    getProfessorById: async (id: number) => {
        const response = await api.get(`/professores/${id}`);
        return response.data;
    },

    // Função para atualizar professor sem usar hook
    updateProfessor: async (id: number, data: Partial<CreateProfessorFormData>) => {
        const requestData = {
            ...data,
            dataDeNascimento: data.dataDeNascimento?.toISOString(),
            telefone: data.telefone,
            dataContratacao: data.dataContratacao?.toISOString(),
        }

        const response = await api.put(`/professores/${id}`, requestData);
        return response.data;
    },

    // Função para deletar professor sem usar hook
    deleteProfessor: async (id: number) => {
        const response = await api.delete(`/professores/${id}`);
        return response.data;
    },
};
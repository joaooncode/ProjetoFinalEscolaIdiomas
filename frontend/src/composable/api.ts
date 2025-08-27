import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react"; // Added missing import for React

// Tipos para as respostas da API
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// Tipos para erros da API
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Configuração da instância do Axios
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: "http://localhost:5213",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000, // 10 segundos
  });

  // Interceptor para requisições
  instance.interceptors.request.use(
    (config) => {
      // Adicionar token de autenticação se existir
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para respostas
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Tratamento de erros global
      if (error.response?.status === 401) {
        // Token expirado ou inválido
        localStorage.removeItem("auth_token");
        // Redirecionar para login se necessário
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Instância da API
export const api = createApiInstance();

// Hook personalizado para métodos HTTP (React)
export const useApi = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<ApiError | null>(null);

  // Função para limpar erros
  const clearError = () => {
    setError(null);
  };

  // Função para fazer requisições GET
  const get = async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await api.get(url, config);
      // O backend retorna diretamente o objeto, não uma estrutura ApiResponse
      return {
        data: response.data,
        success: true
      };
    } catch (err: any) {
      const apiError: ApiError = {
        message: err.response?.data?.mensagem || err.response?.data?.message || err.message || "Erro na requisição",
        status: err.response?.status || 500,
        errors: err.response?.data?.errors,
      };
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer requisições POST
  const post = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await api.post(url, data, config);
      // O backend retorna diretamente o objeto, não uma estrutura ApiResponse
      return {
        data: response.data,
        success: true
      };
    } catch (err: any) {
      const apiError: ApiError = {
        message: err.response?.data?.mensagem || err.response?.data?.message || err.message || "Erro na requisição",
        status: err.response?.status || 500,
        errors: err.response?.data?.errors,
      };
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer requisições PUT
  const put = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await api.put(url, data, config);
      // O backend retorna diretamente o objeto, não uma estrutura ApiResponse
      return {
        data: response.data,
        success: true
      };
    } catch (err: any) {
      const apiError: ApiError = {
        message: err.response?.data?.mensagem || err.response?.data?.message || err.message || "Erro na requisição",
        status: err.response?.status || 500,
        errors: err.response?.data?.errors,
      };
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer requisições PATCH
  const patch = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await api.patch(url, data, config);
      // O backend retorna diretamente o objeto, não uma estrutura ApiResponse
      return {
        data: response.data,
        success: true
      };
    } catch (err: any) {
      const apiError: ApiError = {
        message: err.response?.data?.mensagem || err.response?.data?.message || err.message || "Erro na requisição",
        status: err.response?.status || 500,
        errors: err.response?.data?.errors,
      };
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer requisições DELETE
  const del = async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await api.delete(url, config);
      // O backend retorna diretamente o objeto, não uma estrutura ApiResponse
      return {
        data: response.data,
        success: true
      };
    } catch (err: any) {
      const apiError: ApiError = {
        message: err.response?.data?.mensagem || err.response?.data?.message || err.message || "Erro na requisição",
        status: err.response?.status || 500,
        errors: err.response?.data?.errors,
      };
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  return {
    // Estado
    loading,
    error,
    hasError: error !== null,
    
    // Métodos
    get,
    post,
    put,
    patch,
    del,
    clearError,
  };
};

// Funções utilitárias para uso direto (sem hook)
export const apiGet = <T = any>(url: string, config?: AxiosRequestConfig) => 
  api.get<ApiResponse<T>>(url, config);

export const apiPost = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => 
  api.post<ApiResponse<T>>(url, data, config);

export const apiPut = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => 
  api.put<ApiResponse<T>>(url, data, config);

export const apiPatch = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => 
  api.patch<ApiResponse<T>>(url, data, config);

export const apiDelete = <T = any>(url: string, config?: AxiosRequestConfig) => 
  api.delete<ApiResponse<T>>(url, config);


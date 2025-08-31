import { api } from "../composable/api";
import type {
  Curso,
  CreateCursoRequest,
  UpdateCursoRequest,
} from "../types/Curso";

export const cursoService = {
  // Buscar todos os cursos
  async getCursos(): Promise<Curso[]> {
    const response = await api.get("/cursos");
    return response.data;
  },

  // Buscar curso por ID
  async getCursoById(id: number): Promise<Curso> {
    const response = await api.get(`/cursos/${id}`);
    return response.data;
  },

  // Criar novo curso
  async createCurso(curso: CreateCursoRequest): Promise<{ id: number }> {
    const response = await api.post("/cursos", curso);
    return response.data;
  },

  // Atualizar curso
  async updateCurso(id: number, curso: UpdateCursoRequest): Promise<void> {
    await api.put(`/cursos/${id}`, curso);
  },

  // Deletar curso
  async deleteCurso(id: number): Promise<void> {
    await api.delete(`/cursos/${id}`);
  },
};

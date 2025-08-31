export interface Curso {
  id: number;
  nome: string;
  descricao: string;
  dataCriacao: string;
  categoria: string;
  valor: number;
  cargaHoraria: number;
  professorId: number;
  nomeProfessor?: string;
  sobrenomeProfessor?: string;
  ativo: boolean;
}

export interface CreateCursoRequest {
  nome: string;
  descricao: string;
  dataCriacao: string;
  categoria: string;
  valor: number;
  cargaHoraria: number;
  professorId: number;
  ativo: boolean;
}

export interface UpdateCursoRequest {
  nome?: string;
  descricao?: string;
  categoria?: string;
  valor?: number;
  cargaHoraria?: number;
  professorId?: number;
  ativo?: boolean;
}

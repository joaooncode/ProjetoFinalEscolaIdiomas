export interface Matricula {
  id: number;
  alunoId: number;
  cursoId: number;
  dataMatricula: string;
  dataConclusao?: string;
  status: string;
  notaFinal?: number;
  ativo: boolean;
  // Propriedades de navegação
  alunoNome?: string;
  alunoSobrenome?: string;
  cursoNome?: string;
}

export interface CreateMatriculaRequest {
  alunoId: number;
  cursoId: number;
  dataMatricula?: string;
  status?: string;
  ativo?: boolean;
}

export interface UpdateMatriculaRequest {
  dataConclusao?: string;
  status?: string;
  notaFinal?: number;
  ativo?: boolean;
}

export interface MatriculaResumo {
  id: number;
  alunoId: number;
  alunoNome: string;
  alunoSobrenome: string;
  cursoId: number;
  cursoNome: string;
  dataMatricula: string;
  dataConclusao?: string;
  status: string;
  notaFinal?: number;
  ativo: boolean;
}

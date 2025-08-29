export type Aluno = {
  id: number;
  nome: string;
  sobrenome?: string;
  email?: string;
  telefone?: string;
  dataDeNascimento?: Date;
  dataMatricula?: Date;
  ativo?: boolean;
};

// Tipo para a resposta da API que agora retorna todos os campos
export type AlunoResumo = {
  id: number;
  nome: string;
  sobrenome?: string;
  email?: string;
  telefone?: string;
  dataDeNascimento?: string; // Vem como string da API
  dataMatricula?: string; // Vem como string da API
  ativo: boolean;
};
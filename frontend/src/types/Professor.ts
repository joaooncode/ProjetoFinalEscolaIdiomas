import { Formacoes } from "./Formacoes";

export type Professor = {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  formacao: Formacoes;
  dataDeNascimento?: string;
  dataContratacao?: string;
  ativo: boolean;
};

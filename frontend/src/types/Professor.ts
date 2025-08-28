import { Formacoes } from "./Formacoes";

export type Professor = {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  formacao: Formacoes;
  dataDeNascimento: Date;
  dataContratacao: Date;
  ativo: boolean;
};

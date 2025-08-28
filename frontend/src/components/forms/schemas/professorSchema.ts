import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Formacoes } from "@/types/Formacoes";

// Schema para criação de professor
export const createProfessorSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),

  sobrenome: z
    .string()
    .min(2, "Sobrenome deve ter pelo menos 2 caracteres")
    .max(100, "Sobrenome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Sobrenome deve conter apenas letras"),

  email: z.email("Email deve ser válido"),

  formacao: z.enum(Formacoes, {
    message: "Formação inválida",
  }),

  dataDeNascimento: z.date({
    message: "Data de nascimento é obrigatória",
  }),

  dataContratacao: z.date({
    message: "Data de contratação é obrigatória",
  }),

  ativo: z.boolean({
    message: "Ativo é obrigatório",
  }),
});

// Schema para atualização de professor
export const updateProfessorSchema = createProfessorSchema.partial();

// Schema para busca/filtro de professores
export const searchProfessorSchema = z.object({
  nome: z.string().optional(),
  email: z.string().optional(),
  ativo: z.boolean().optional(),
  dataInicio: z.date().optional(),
  dataFim: z.date().optional(),
});

// Tipos TypeScript derivados dos schemas
export type CreateProfessorFormData = z.infer<typeof createProfessorSchema>;
export type UpdateProfessorFormData = z.infer<typeof updateProfessorSchema>;
export type SearchProfessorFormData = z.infer<typeof searchProfessorSchema>;

// Interface para resposta da API
export interface ProfessorResponse {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  formacao: Formacoes;
  dataDeNascimento: string;
  dataContratacao: string;
  ativo: boolean;
}

// Hook personalizado para formulário de criação
export const useCreateProfessorForm = () => {
  return useForm<CreateProfessorFormData>({
    resolver: zodResolver(createProfessorSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      formacao: Formacoes.EnsinoMedio,
      dataDeNascimento: undefined,
      dataContratacao: undefined,
      ativo: true,
    },
  });
};

// Hook personalizado para formulário de atualização
export const useUpdateProfessorForm = (
  defaultValues?: Partial<UpdateProfessorFormData>
) => {
  return useForm<UpdateProfessorFormData>({
    resolver: zodResolver(updateProfessorSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      formacao: Formacoes.EnsinoMedio,
      dataDeNascimento: undefined,
      dataContratacao: undefined,
      ativo: true,
      ...defaultValues,
    },
  });
};

// Hook personalizado para formulário de busca
export const useSearchProfessorForm = () => {
  return useForm<SearchProfessorFormData>({
    resolver: zodResolver(searchProfessorSchema),
    defaultValues: {
      nome: "",
      email: "",
      ativo: undefined,
      dataInicio: undefined,
      dataFim: undefined,
    },
  });
};

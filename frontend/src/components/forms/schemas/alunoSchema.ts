import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Schema para criação de aluno
export const createAlunoSchema = z.object({
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

  dataDeNascimento: z
    .date({
      message: "Data de nascimento é obrigatória",
    })
    .refine((date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < date.getDate())
      ) {
        return age - 1 >= 3; // Mínimo 3 anos
      }
      return age >= 3;
    }, "Aluno deve ter pelo menos 3 anos de idade")
    .refine((date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < date.getDate())
      ) {
        return age - 1 <= 120; // Máximo 120 anos
      }
      return age <= 120;
    }, "Data de nascimento inválida"),

  email: z.email("Email deve ser válido"),

  telefone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(15, "Telefone deve ter no máximo 15 dígitos")
    .regex(
      /^[\d\s()\-+]+$/,
      "Telefone deve conter apenas números, espaços, parênteses, hífens e +"
    ),

  ativo: z.boolean(),
});

// Schema para atualização de aluno (todos os campos opcionais)
export const updateAlunoSchema = createAlunoSchema.partial();

// Schema para busca/filtro de alunos
export const searchAlunoSchema = z.object({
  nome: z.string().optional(),
  email: z.string().optional(),
  ativo: z.boolean().optional(),
  dataInicio: z.date().optional(),
  dataFim: z.date().optional(),
});

// Tipos TypeScript derivados dos schemas
export type CreateAlunoFormData = z.infer<typeof createAlunoSchema>;
export type UpdateAlunoFormData = z.infer<typeof updateAlunoSchema>;
export type SearchAlunoFormData = z.infer<typeof searchAlunoSchema>;

// Interface para resposta da API
export interface AlunoResponse {
  id: number;
  nome: string;
  sobrenome: string;
  dataDeNascimento: string; // ISO date string
  email: string;
  telefone: string;
  dataMatricula: string; // ISO date string
  ativo: boolean;
}

// Hook personalizado para formulário de criação
export const useCreateAlunoForm = () => {
  return useForm<CreateAlunoFormData>({
    resolver: zodResolver(createAlunoSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      dataDeNascimento: undefined,
      email: "",
      telefone: "",
      ativo: true,
    },
  });
};

// Hook personalizado para formulário de atualização
export const useUpdateAlunoForm = (
  defaultValues?: Partial<UpdateAlunoFormData>
) => {
  return useForm<UpdateAlunoFormData>({
    resolver: zodResolver(updateAlunoSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      dataDeNascimento: undefined,
      email: "",
      telefone: "",
      ativo: true,
      ...defaultValues,
    },
  });
};

// Hook personalizado para formulário de busca
export const useSearchAlunoForm = () => {
  return useForm<SearchAlunoFormData>({
    resolver: zodResolver(searchAlunoSchema),
    defaultValues: {
      nome: "",
      email: "",
      ativo: undefined,
      dataInicio: undefined,
      dataFim: undefined,
    },
  });
};

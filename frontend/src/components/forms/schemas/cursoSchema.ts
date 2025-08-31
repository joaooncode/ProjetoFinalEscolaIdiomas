import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Categorias } from "../../../types/Categorias";

// Schema para criação de curso
export const createCursoSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  descricao: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),

  categoria: z.string().min(1, "Categoria é obrigatória"),

  valor: z
    .number()
    .min(0, "Valor deve ser maior ou igual a zero")
    .max(10000, "Valor deve ser menor ou igual a R$ 10.000"),

  cargaHoraria: z
    .number()
    .min(1, "Carga horária deve ser maior que zero")
    .max(1000, "Carga horária deve ser menor ou igual a 1000 horas"),

  professorId: z.number().min(1, "Professor é obrigatório"),

  dataCriacao: z.date({
    message: "Data de criação é obrigatória",
  }),

  ativo: z.boolean({
    message: "Ativo é obrigatório",
  }),
});

// Schema para atualização de curso
export const updateCursoSchema = createCursoSchema.partial();

// Schema para busca/filtro de cursos
export const searchCursoSchema = z.object({
  nome: z.string().optional(),
  categoria: z.string().optional(),
  ativo: z.boolean().optional(),
  dataInicio: z.date().optional(),
  dataFim: z.date().optional(),
});

// Tipos TypeScript derivados dos schemas
export type CreateCursoFormData = z.infer<typeof createCursoSchema>;
export type UpdateCursoFormData = z.infer<typeof updateCursoSchema>;
export type SearchCursoFormData = z.infer<typeof searchCursoSchema>;

// Interface para resposta da API
export interface CursoResponse {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  valor: number;
  cargaHoraria: number;
  professorId: number;
  dataCriacao: string;
  ativo: boolean;
}

// Hook personalizado para formulário de criação
export const useCreateCursoForm = () => {
  return useForm<CreateCursoFormData>({
    resolver: zodResolver(createCursoSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      categoria: Categorias.Basico,
      valor: 0,
      cargaHoraria: 0,
      professorId: 0,
      dataCriacao: undefined,
      ativo: true,
    },
  });
};

// Hook personalizado para formulário de atualização
export const useUpdateCursoForm = (
  defaultValues?: Partial<UpdateCursoFormData>
) => {
  return useForm<UpdateCursoFormData>({
    resolver: zodResolver(updateCursoSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      categoria: Categorias.Basico,
      valor: 0,
      cargaHoraria: 0,
      professorId: 0,
      dataCriacao: undefined,
      ativo: true,
      ...defaultValues,
    },
  });
};

// Hook personalizado para formulário de busca
export const useSearchCursoForm = () => {
  return useForm<SearchCursoFormData>({
    resolver: zodResolver(searchCursoSchema),
    defaultValues: {
      nome: "",
      categoria: "",
      ativo: undefined,
      dataInicio: undefined,
      dataFim: undefined,
    },
  });
};

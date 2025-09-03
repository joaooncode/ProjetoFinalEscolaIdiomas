import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Schema para criação de matrícula
export const createMatriculaSchema = z.object({
  alunoId: z
    .number({
      required_error: "Aluno é obrigatório",
      invalid_type_error: "Aluno deve ser um número",
    })
    .min(1, "Aluno é obrigatório"),

  cursoId: z
    .number({
      required_error: "Curso é obrigatório",
      invalid_type_error: "Curso deve ser um número",
    })
    .min(1, "Curso é obrigatório"),

  dataMatricula: z
    .date({
      message: "Data de matrícula é obrigatória",
    })
    .refine((date) => {
      const today = new Date();
      return date <= today;
    }, "Data de matrícula não pode ser futura"),

  status: z
    .string()
    .min(1, "Status é obrigatório")
    .default("Ativa"),

  ativo: z.boolean().default(true),
});

// Schema para atualização de matrícula
export const updateMatriculaSchema = z.object({
  dataConclusao: z
    .date()
    .optional()
    .refine((date) => {
      if (!date) return true;
      const today = new Date();
      return date <= today;
    }, "Data de conclusão não pode ser futura"),

  status: z
    .string()
    .min(1, "Status é obrigatório")
    .optional(),

  notaFinal: z
    .number()
    .min(0, "Nota deve ser maior ou igual a 0")
    .max(10, "Nota deve ser menor ou igual a 10")
    .optional(),

  ativo: z.boolean().optional(),
});

// Schema para busca/filtro de matrículas
export const searchMatriculaSchema = z.object({
  alunoId: z.number().optional(),
  cursoId: z.number().optional(),
  status: z.string().optional(),
  ativo: z.boolean().optional(),
  dataInicio: z.date().optional(),
  dataFim: z.date().optional(),
});

// Tipos TypeScript derivados dos schemas
export type CreateMatriculaFormData = z.infer<typeof createMatriculaSchema>;
export type UpdateMatriculaFormData = z.infer<typeof updateMatriculaSchema>;
export type SearchMatriculaFormData = z.infer<typeof searchMatriculaSchema>;

// Hook personalizado para formulário de criação
export const useCreateMatriculaForm = () => {
  return useForm<CreateMatriculaFormData>({
    resolver: zodResolver(createMatriculaSchema),
    defaultValues: {
      alunoId: 0,
      cursoId: 0,
      dataMatricula: new Date(),
      status: "Ativa",
      ativo: true,
    },
  });
};

// Hook personalizado para formulário de atualização
export const useUpdateMatriculaForm = (
  defaultValues?: Partial<UpdateMatriculaFormData>
) => {
  return useForm<UpdateMatriculaFormData>({
    resolver: zodResolver(updateMatriculaSchema),
    defaultValues: {
      status: "Ativa",
      ativo: true,
      ...defaultValues,
    },
  });
};

// Hook personalizado para formulário de busca
export const useSearchMatriculaForm = () => {
  return useForm<SearchMatriculaFormData>({
    resolver: zodResolver(searchMatriculaSchema),
    defaultValues: {
      alunoId: undefined,
      cursoId: undefined,
      status: undefined,
      ativo: undefined,
      dataInicio: undefined,
      dataFim: undefined,
    },
  });
};

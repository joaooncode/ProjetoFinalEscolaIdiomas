export const Categorias = {
  Basico: "Básico",
  Medio: "Médio",
  Avancado: "Avançado",
} as const;

export type Categorias = (typeof Categorias)[keyof typeof Categorias];

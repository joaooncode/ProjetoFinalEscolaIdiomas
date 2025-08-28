export const Formacoes = {
  EnsinoMedio: "Ensino Médio",
  EnsinoTecnico: "Ensino Técnico",
  Graduado: "Graduado",
  PosGraduado: "Pós-Graduado",
  Mestrado: "Mestrado",
  Doutorado: "Doutorado",
} as const;

export type Formacoes = (typeof Formacoes)[keyof typeof Formacoes];

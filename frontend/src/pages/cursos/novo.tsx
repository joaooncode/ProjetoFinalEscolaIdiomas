import React, { useState } from "react";
import { CreateCursoForm } from "../../components/forms/cursos";
import { cursoService } from "../../services/cursoService";
import type { CreateCursoFormData } from "../../components/forms/schemas/cursoSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NovoCursoPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateCursoFormData) => {
    try {
      setIsLoading(true);

      // Converter a data para string ISO
      const cursoData = {
        ...data,
        dataCriacao: data.dataCriacao.toISOString(),
      };

      await cursoService.createCurso(cursoData);

      toast.success("Curso cadastrado com sucesso!");
      navigate("/cursos");
    } catch (error) {
      console.error("Erro ao cadastrar curso:", error);
      toast.error("Erro ao cadastrar curso. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/cursos");
  };

  return (
    <CreateCursoForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onCancel={handleCancel}
    />
  );
};

export default NovoCursoPage;

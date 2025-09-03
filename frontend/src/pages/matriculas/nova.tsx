import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateMatriculaForm } from "../../components/forms/matriculas/MatriculaForm";
import { useMatriculaService } from "../../services/matriculaService";
import type { CreateMatriculaFormData } from "../../components/forms/schemas/matriculaSchema";
import { toast } from "sonner";

const NovaMatriculaPage: React.FC = () => {
  const navigate = useNavigate();
  const { insertMatricula, loading, error } = useMatriculaService();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: CreateMatriculaFormData) => {
    try {
      setIsSubmitting(true);
      await insertMatricula(data);
      
      toast.success("Matrícula criada com sucesso!", {
        description: "O aluno foi matriculado no curso selecionado.",
      });
      
      // Redirecionar para a lista de matrículas
      navigate("/matriculas");
    } catch (error) {
      console.error("Erro ao criar matrícula:", error);
      
      toast.error("Erro ao criar matrícula", {
        description: "Ocorreu um erro ao tentar criar a matrícula. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/matriculas");
  };

  return (
    <CreateMatriculaForm
      onSubmit={handleSubmit}
      isLoading={isSubmitting}
      onCancel={handleCancel}
    />
  );
};

export default NovaMatriculaPage;

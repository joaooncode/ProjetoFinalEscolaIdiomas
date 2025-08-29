import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateProfessorForm } from "../../components/forms/professores";
import { professorService } from "../../services/professorService";
import type { CreateProfessorFormData } from "../../components/forms/schemas/professorSchema";

const NovoProfessorPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (data: CreateProfessorFormData) => {
    setIsLoading(true);
    try {
      await professorService.insertProfessor(data);
      console.log("Professor cadastrado com sucesso!");
      navigate("/professores");
    } catch (error: any) {
      console.error("Erro ao cadastrar professor:", error);
      alert(error.message || "Erro ao cadastrar professor");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/professores");
  };

  return (
    <CreateProfessorForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onCancel={handleCancel}
    />
  );
};

export default NovoProfessorPage;

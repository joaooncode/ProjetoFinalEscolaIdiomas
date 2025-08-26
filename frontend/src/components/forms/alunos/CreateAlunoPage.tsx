import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateAlunoForm } from "./index";
import { type CreateAlunoFormData } from "../schemas/alunoSchema";

const CreateAlunoPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateAlunoFormData) => {
    setIsLoading(true);
    
    try {
      // Aqui você faria a chamada para sua API
      console.log("Dados do formulário:", data);
      
      // Simular chamada da API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sucesso
      alert("Aluno cadastrado com sucesso!");
      
      // Redirecionar para a página anterior ou para a lista de alunos
      navigate(-1);
      
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      alert("Erro ao cadastrar aluno. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Navegar de volta para a página anterior
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Cadastrar Novo Aluno
        </h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para cadastrar um novo aluno no sistema.
        </p>
      </div>

      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <CreateAlunoForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default CreateAlunoPage;

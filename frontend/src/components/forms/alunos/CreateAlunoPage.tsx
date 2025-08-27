import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateAlunoForm } from "./index";
import { type CreateAlunoFormData } from "../schemas/alunoSchema";
import { CheckCircle, XCircle } from "lucide-react";

const CreateAlunoPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateAlunoFormData) => {
    setIsLoading(true);
    setShowSuccess(false);
    setShowError(false);
    
    try {
      // Aqui você faria a chamada para sua API
      console.log("Dados do formulário:", data);
      
      // Simular chamada da API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sucesso
      setShowSuccess(true);
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      setErrorMessage("Erro ao cadastrar aluno. Tente novamente.");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Navegar de volta para a página anterior
    navigate(-1);
  };

  return (
    <div className="relative">
      {/* Toast de Sucesso */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right duration-300 dark:bg-green-600">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Aluno cadastrado com sucesso!</span>
        </div>
      )}

      {/* Toast de Erro */}
      {showError && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right duration-300 dark:bg-red-600">
          <XCircle className="w-5 h-5" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      <CreateAlunoForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CreateAlunoPage;

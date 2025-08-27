import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateAlunoForm } from "./index";
import { type CreateAlunoFormData } from "../schemas/alunoSchema";
import { CheckCircle, XCircle } from "lucide-react";
import { useAlunosService } from "../../../services/alunosService";

const CreateAlunoPage: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { insertAluno, loading, error, clearError } = useAlunosService();

  const handleSubmit = async (data: CreateAlunoFormData) => {
    setShowSuccess(false);
    setShowError(false);
    clearError();
    
    try {
      // Usar o serviço para inserir o aluno
      const response = await insertAluno(data);
      
      console.log("Aluno cadastrado com sucesso:", response);
      
      // Sucesso
      setShowSuccess(true);
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      
    } catch (error: any) {
      console.error("Erro ao cadastrar aluno:", error);
      
      // Usar mensagem de erro da API ou mensagem padrão
      const message = error?.message || "Erro ao cadastrar aluno. Tente novamente.";
      setErrorMessage(message);
      setShowError(true);
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
        isLoading={loading}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CreateAlunoPage;

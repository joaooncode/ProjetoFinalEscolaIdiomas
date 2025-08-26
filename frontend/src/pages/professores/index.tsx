import React from "react";

const ProfessoresPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Gerenciar Professores
        </h1>
        <p className="text-muted-foreground">
          Visualize e gerencie todos os professores cadastrados no sistema.
        </p>
      </div>

      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">Lista de Professores</p>
            <p>Esta página será implementada em breve.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessoresPage;

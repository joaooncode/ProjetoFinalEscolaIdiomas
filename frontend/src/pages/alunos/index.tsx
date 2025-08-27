import React from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../components/data-tables/alunos/data-table";
import { columns } from "../../components/data-tables/alunos/columns";
import { Button } from "../../components/ui/button";
import { Plus, Users } from "lucide-react";
import type { Aluno } from "../../types/Aluno";

const alunos: Aluno[] = [
    {
        id: "1",
        nome: "João da Silva",
        email: "joao@example.com",
        telefone: "(11) 99999-9999",
        dataNascimento: new Date("1990-01-01"),
        ativo: true,
    },
    {
      id: "2",
      nome: "Maria Oliveira",
      email: "maria@example.com",
      telefone: "(11) 99999-9999",
      dataNascimento: new Date("1990-01-01"),
      ativo: true,
    },
    {
      id: "3",
      nome: "Pedro Santos",
      email: "pedro@example.com",
      telefone: "(11) 99999-9999",
      dataNascimento: new Date("1990-01-01"),
      ativo: true,
    }
]

const AlunosPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative z-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Gerenciar Alunos
                </h1>
                <p className="text-muted-foreground">
                  Visualize e gerencie todos os alunos cadastrados no sistema.
                </p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/alunos/novo')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Aluno
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <DataTable columns={columns} data={alunos} />
        </div>
      </div>
    </div>
  );
};

export default AlunosPage;

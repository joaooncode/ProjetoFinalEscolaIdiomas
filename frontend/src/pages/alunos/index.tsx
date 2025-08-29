import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../components/data-tables/alunos/data-table";
import { columns } from "../../components/data-tables/alunos/columns";
import { Button } from "../../components/ui/button";
import { Plus, Users, RefreshCw } from "lucide-react";
import type { AlunoResumo } from "../../types/Aluno";
import { alunosService } from "../../services/alunosService";

const AlunosPage: React.FC = () => {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<AlunoResumo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlunos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await alunosService.getAlunos();
      setAlunos(data);
    } catch (err: any) {
      console.error("Erro ao buscar alunos:", err);
      setError(err.message || "Erro ao carregar alunos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleRefresh = () => {
    fetchAlunos();
  };

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
            <div className="flex gap-2">
              <Button 
                onClick={handleRefresh}
                disabled={loading}
                variant="outline"
                className="font-medium"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              <Button 
                onClick={() => navigate('/alunos/novo')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Aluno
              </Button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg">
            <p className="text-muted-foreground text-sm">Carregando alunos...</p>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <DataTable 
            columns={columns} 
            data={alunos} 
          />
        </div>
      </div>
    </div>
  );
};

export default AlunosPage;

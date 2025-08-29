import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTableProfessor } from "../../components/data-tables/professores/data-table-professores";
import { columns } from "../../components/data-tables/professores/columns";
import { Button } from "../../components/ui/button";
import { Plus, GraduationCap, RefreshCw } from "lucide-react";
import type { Professor } from "../../types/Professor";
import { professorService } from "../../services/professorService";

const ProfessoresPage: React.FC = () => {
  const navigate = useNavigate();
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchProfessores = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await professorService.getProfessores();
      setProfessores(data);
    } catch (err: any) {
      console.error("Erro ao buscar professores:", err);
      setError(err.message || "Erro ao carregar professores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessores();
  }, []);

  const handleRefresh = () => {
    fetchProfessores();
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative z-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Gerenciar Professores
                </h1>
                <p className="text-muted-foreground">
                  Visualize e gerencie todos os professores cadastrados no sistema.
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
                onClick={() => navigate('/professores/novo')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Professor
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
            <p className="text-muted-foreground text-sm">Carregando professores...</p>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <DataTableProfessor 
            columns={columns} 
            data={professores} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessoresPage;

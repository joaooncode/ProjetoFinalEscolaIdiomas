import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../components/data-tables/matriculas/data-table";
import { columns } from "../../components/data-tables/matriculas/columns";
import { matriculaService } from "../../services/matriculaService";
import type { MatriculaResumo } from "../../types/Matricula";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const MatriculasPage: React.FC = () => {
  const navigate = useNavigate();
  const [matriculas, setMatriculas] = useState<MatriculaResumo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatriculas();
  }, []);

  const fetchMatriculas = async () => {
    try {
      setLoading(true);
      const data = await matriculaService.getMatriculas();
      console.log("Dados recebidos na página:", JSON.stringify(data, null, 2));
      setMatriculas(data);
    } catch (error) {
      console.error("Erro ao buscar matrículas:", error);
      toast.error("Erro ao carregar matrículas", {
        description: "Não foi possível carregar a lista de matrículas.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    navigate("/matriculas/nova");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gerenciar Matrículas
          </h1>
          <p className="text-muted-foreground">
            Visualize e gerencie todas as matrículas no sistema.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Carregando matrículas...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Gerenciar Matrículas
        </h1>
        <p className="text-muted-foreground">
          Visualize e gerencie todas as matrículas no sistema.
        </p>
      </div>

      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <DataTable
          columns={columns}
          data={matriculas}
          onAddNew={handleAddNew}
        />
      </div>
    </div>
  );
};

export default MatriculasPage;

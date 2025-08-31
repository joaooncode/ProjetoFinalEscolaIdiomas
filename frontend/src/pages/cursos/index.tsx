import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Plus, BookOpen, RefreshCw } from "lucide-react";
import { DataTableCurso } from "../../components/data-tables/cursos/data-table-cursos";
import { columns } from "../../components/data-tables/cursos/columns";
import { cursoService } from "../../services/cursoService";
import type { Curso } from "../../types/Curso";
import { useNavigate } from "react-router-dom";

const CursosPage: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCursos = async () => {
    try {
      setIsLoading(true);
      const data = await cursoService.getCursos();
      setCursos(data);
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleNovoCurso = () => {
    navigate("/cursos/novo");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Gerenciar Cursos
            </h1>
            <p className="text-muted-foreground">
              Visualize e gerencie todos os cursos disponíveis no sistema.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={fetchCursos}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Atualizar
            </Button>
            <Button
              onClick={handleNovoCurso}
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Novo Curso
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-card border rounded-lg shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              <span className="text-muted-foreground">
                Carregando cursos...
              </span>
            </div>
          </div>
        ) : cursos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum curso encontrado
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Comece cadastrando o primeiro curso no sistema para visualizá-lo
              aqui.
            </p>
            <Button
              onClick={handleNovoCurso}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Cadastrar Primeiro Curso
            </Button>
          </div>
        ) : (
          <div className="p-6">
            <DataTableCurso columns={columns} data={cursos} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CursosPage;

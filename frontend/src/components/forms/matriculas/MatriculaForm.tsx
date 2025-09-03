import React, { useEffect, useState } from "react";
import { useCreateMatriculaForm, type CreateMatriculaFormData } from "../schemas/matriculaSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { 
  User, 
  BookOpen, 
  Calendar as CalendarIcon, 
  CheckCircle, 
  XCircle, 
  GraduationCap,
  Save,
  ArrowLeft,
  Users,
  School
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "../../../lib/utils";
import { alunosService } from "../../../services/alunosService";
import { cursoService } from "../../../services/cursoService";
import type { AlunoResumo } from "../../../types/Aluno";
import type { Curso } from "../../../types/Curso";

interface CreateMatriculaFormProps {
  onSubmit: (data: CreateMatriculaFormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

export const CreateMatriculaForm: React.FC<CreateMatriculaFormProps> = ({
  onSubmit,
  isLoading = false,
  onCancel,
}) => {
  const form = useCreateMatriculaForm();
  const [alunos, setAlunos] = useState<AlunoResumo[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const [alunosData, cursosData] = await Promise.all([
          alunosService.getAlunos(),
          cursoService.getCursos()
        ]);
        setAlunos(alunosData);
        setCursos(cursosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (data: CreateMatriculaFormData) => {
    onSubmit(data);
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-background py-8 px-4 relative z-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando dados...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative z-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Nova Matrícula
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Preencha os dados abaixo para matricular um aluno em um curso
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Seleção de Aluno e Curso */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Seleção de Aluno e Curso
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Escolha o aluno e o curso para a matrícula
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Aluno */}
                <FormField
                  control={form.control}
                  name="alunoId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <User className="w-4 h-4" />
                        Aluno *
                      </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 border-input focus:border-ring focus:ring-ring transition-colors">
                            <SelectValue placeholder="Selecione um aluno" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {alunos
                            .filter(aluno => aluno.ativo)
                            .map((aluno) => (
                              <SelectItem key={aluno.id} value={aluno.id.toString()}>
                                {aluno.nome} {aluno.sobrenome}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Curso */}
                <FormField
                  control={form.control}
                  name="cursoId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <BookOpen className="w-4 h-4" />
                        Curso *
                      </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 border-input focus:border-ring focus:ring-ring transition-colors">
                            <SelectValue placeholder="Selecione um curso" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cursos
                            .filter(curso => curso.ativo)
                            .map((curso) => (
                              <SelectItem key={curso.id} value={curso.id.toString()}>
                                {curso.nome} - {curso.categoria}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Detalhes da Matrícula */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <School className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Detalhes da Matrícula
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Configure os parâmetros da matrícula
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Data de Matrícula */}
                <FormField
                  control={form.control}
                  name="dataMatricula"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <CalendarIcon className="w-4 h-4" />
                        Data de Matrícula *
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-12 pl-3 text-left font-normal border-input focus:border-ring focus:ring-ring transition-colors",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={isLoading}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: ptBR })
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <CheckCircle className="w-4 h-4" />
                        Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 border-input focus:border-ring focus:ring-ring transition-colors">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Ativa">Ativa</SelectItem>
                          <SelectItem value="Concluída">Concluída</SelectItem>
                          <SelectItem value="Cancelada">Cancelada</SelectItem>
                          <SelectItem value="Trancada">Trancada</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Ativo */}
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="ativo"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium text-foreground">
                          Matrícula Ativa
                        </FormLabel>
                        <FormDescription className="text-sm text-muted-foreground">
                          Marque esta opção se a matrícula estiver ativa no sistema
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Cancelar
                </Button>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Salvando..." : "Salvar Matrícula"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

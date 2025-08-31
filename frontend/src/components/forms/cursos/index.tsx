import React, { useState, useEffect } from "react";
import {
  useCreateCursoForm,
  type CreateCursoFormData,
} from "../schemas/cursoSchema";
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
import {
  BookOpen,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  GraduationCap,
  Save,
  ArrowLeft,
  FileText,
  Tag,
  Loader2,
} from "lucide-react";
import { Categorias } from "../../../types/Categorias";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { professorService } from "../../../services/professorService";
import type { Professor } from "../../../types/Professor";

interface CreateCursoFormProps {
  onSubmit: (data: CreateCursoFormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

export const CreateCursoForm: React.FC<CreateCursoFormProps> = ({
  onSubmit,
  isLoading = false,
  onCancel,
}) => {
  const form = useCreateCursoForm();
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [isLoadingProfessores, setIsLoadingProfessores] = useState(true);

  // Carregar professores ao montar o componente
  useEffect(() => {
    const loadProfessores = async () => {
      try {
        setIsLoadingProfessores(true);
        const data = await professorService.getProfessores();
        setProfessores(data);
      } catch (error) {
        console.error("Erro ao carregar professores:", error);
      } finally {
        setIsLoadingProfessores(false);
      }
    };

    loadProfessores();
  }, []);

  const handleSubmit = (data: CreateCursoFormData) => {
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative z-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Cadastro de Curso
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Preencha os dados abaixo para cadastrar um novo curso no sistema
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            {/* Informações Básicas */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Informações Básicas
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Dados fundamentais do curso
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome */}
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <BookOpen className="w-4 h-4" />
                        Nome do Curso *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome do curso"
                          {...field}
                          disabled={isLoading}
                          className="h-12 border-input focus:border-ring focus:ring-ring transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Categoria */}
                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Tag className="w-4 h-4" />
                        Categoria *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 border-input focus:border-ring focus:ring-ring transition-colors">
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(Categorias).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Data de Criação */}
                <FormField
                  control={form.control}
                  name="dataCriacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Calendar className="w-4 h-4" />
                        Data de Criação *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) => {
                            const date = e.target.value
                              ? new Date(e.target.value)
                              : undefined;
                            field.onChange(date);
                          }}
                          disabled={isLoading}
                          className="h-12 border-input focus:border-ring focus:ring-ring transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Professor */}
                <FormField
                  control={form.control}
                  name="professorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <GraduationCap className="w-4 h-4" />
                        Professor *
                      </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString() || ""}
                        disabled={isLoading || isLoadingProfessores}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 border-input focus:border-ring focus:ring-ring transition-colors">
                            <SelectValue
                              placeholder={
                                isLoadingProfessores
                                  ? "Carregando professores..."
                                  : "Selecione um professor"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingProfessores ? (
                            <div className="flex items-center justify-center p-4">
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              <span>Carregando...</span>
                            </div>
                          ) : professores.length === 0 ? (
                            <div className="p-4 text-center text-muted-foreground">
                              Nenhum professor encontrado
                            </div>
                          ) : (
                            professores.map((professor) => (
                              <SelectItem
                                key={professor.id}
                                value={professor.id.toString()}
                              >
                                {professor.nome} {professor.sobrenome}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Informações Acadêmicas */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Informações Acadêmicas
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Dados de carga horária e valor
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Carga Horária */}
                <FormField
                  control={form.control}
                  name="cargaHoraria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Clock className="w-4 h-4" />
                        Carga Horária (horas) *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ex: 40"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          disabled={isLoading}
                          className="h-12 border-input focus:border-ring focus:ring-ring transition-colors"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-muted-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Número total de horas do curso
                      </FormDescription>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Valor */}
                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <DollarSign className="w-4 h-4" />
                        Valor (R$) *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Ex: 299.99"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          disabled={isLoading}
                          className="h-12 border-input focus:border-ring focus:ring-ring transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Status Ativo */}
                <FormField
                  control={form.control}
                  name="ativo"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border p-4 bg-muted/50">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium text-foreground">
                          Curso Ativo
                        </FormLabel>
                        <FormDescription className="text-xs text-muted-foreground">
                          Marque se o curso está ativo no sistema
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Descrição */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Descrição do Curso
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Detalhes sobre o conteúdo e objetivos
                  </p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <FileText className="w-4 h-4" />
                      Descrição *
                    </FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Descreva o conteúdo, objetivos e público-alvo do curso..."
                        {...field}
                        disabled={isLoading}
                        rows={4}
                        className="w-full p-3 border border-input rounded-md focus:border-ring focus:ring-ring transition-colors resize-none"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
                      Mínimo 10 caracteres, máximo 500 caracteres
                    </FormDescription>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />
            </div>

            {/* Botões de Ação */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                    className="h-12 px-6 border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Cadastrar Curso
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

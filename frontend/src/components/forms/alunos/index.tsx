import React from "react";
import { useCreateAlunoForm, type CreateAlunoFormData } from "../schemas/alunoSchema";
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
  User, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  GraduationCap,
  Save,
  ArrowLeft
} from "lucide-react";

interface CreateAlunoFormProps {
  onSubmit: (data: CreateAlunoFormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

export const CreateAlunoForm: React.FC<CreateAlunoFormProps> = ({
  onSubmit,
  isLoading = false,
  onCancel,
}) => {
  const form = useCreateAlunoForm();

  const handleSubmit = (data: CreateAlunoFormData) => {
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative z-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Cadastro de Aluno
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Preencha os dados abaixo para cadastrar um novo aluno no sistema
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Informações Pessoais */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Informações Pessoais
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Dados básicos do aluno
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
                        <User className="w-4 h-4" />
                        Nome *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome do aluno"
                          {...field}
                          disabled={isLoading}
                          className="h-12 border-input focus:border-ring focus:ring-ring transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Sobrenome */}
                <FormField
                  control={form.control}
                  name="sobrenome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <User className="w-4 h-4" />
                        Sobrenome *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o sobrenome do aluno"
                          {...field}
                          disabled={isLoading}
                          className="h-12 border-input focus:border-ring focus:ring-ring transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Data de Nascimento */}
                <FormField
                  control={form.control}
                  name="dataDeNascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Calendar className="w-4 h-4" />
                        Data de Nascimento *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                          onChange={(e) => {
                            const date = e.target.value ? new Date(e.target.value) : undefined;
                            field.onChange(date);
                          }}
                          disabled={isLoading}
                          className="h-12 border-input focus:border-ring focus:ring-ring transition-colors"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-muted-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        O aluno deve ter pelo menos 3 anos de idade
                      </FormDescription>
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
                          Aluno Ativo
                        </FormLabel>
                        <FormDescription className="text-xs text-muted-foreground">
                          Marque se o aluno está ativo no sistema
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Informações de Contato
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Dados para comunicação
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Mail className="w-4 h-4" />
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="aluno@exemplo.com"
                          {...field}
                          disabled={isLoading}
                          className="h-12 border-input focus:border-ring focus:ring-ring transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

                {/* Telefone */}
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Phone className="w-4 h-4" />
                        Telefone *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          {...field}
                          disabled={isLoading}
                          className="h-12 border-input focus:border-ring focus:ring-ring transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />
              </div>
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
                      Cadastrar Aluno
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

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome do aluno"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sobrenome */}
          <FormField
            control={form.control}
            name="sobrenome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o sobrenome do aluno"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Data de Nascimento */}
          <FormField
            control={form.control}
            name="dataDeNascimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento *</FormLabel>
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
                  />
                </FormControl>
                <FormDescription>
                  O aluno deve ter pelo menos 3 anos de idade
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="aluno@exemplo.com"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Telefone */}
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone *</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status Ativo */}
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
                  <FormLabel>Aluno Ativo</FormLabel>
                  <FormDescription>
                    Marque se o aluno está ativo no sistema
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Cadastrar Aluno"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { MatriculaResumo } from "../../../types/Matricula";

// Função para obter o ícone e cor do status
const getStatusInfo = (status: string) => {
  switch (status.toLowerCase()) {
    case "ativa":
      return { icon: CheckCircle, color: "bg-green-100 text-green-800 hover:bg-green-200" };
    case "concluída":
      return { icon: CheckCircle, color: "bg-blue-100 text-blue-800 hover:bg-blue-200" };
    case "cancelada":
      return { icon: XCircle, color: "bg-red-100 text-red-800 hover:bg-red-200" };
    case "trancada":
      return { icon: Clock, color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" };
    default:
      return { icon: AlertCircle, color: "bg-gray-100 text-gray-800 hover:bg-gray-200" };
  }
};

// Função para formatar a data
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  } catch {
    return "Data inválida";
  }
};

// Função para formatar a nota
const formatNota = (nota?: number) => {
  if (nota === undefined || nota === null) return "N/A";
  return nota.toFixed(1);
};

export const columns: ColumnDef<MatriculaResumo>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return (
        <div className="text-sm font-medium text-muted-foreground">
          #{row.getValue("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "AlunoNome",
    header: "Aluno",
    cell: ({ row }) => {
      const alunoNome = row.getValue("AlunoNome") as string;
      const alunoSobrenome = row.getValue("AlunoSobrenome") as string;
      const nomeCompleto = `${alunoNome} ${alunoSobrenome}`.trim();
      
      return (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{nomeCompleto}</span>
          <span className="text-xs text-muted-foreground">
            ID: {row.getValue("alunoId")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "CursoNome",
    header: "Curso",
    cell: ({ row }) => {
      const cursoNome = row.getValue("CursoNome") as string;
      
      return (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{cursoNome}</span>
          <span className="text-xs text-muted-foreground">
            ID: {row.getValue("CursoId")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "dataMatricula",
    header: "Data de Matrícula",
    cell: ({ row }) => {
      const dataMatricula = row.getValue("dataMatricula") as string;
      
      return (
        <div className="text-sm text-foreground">
          {formatDate(dataMatricula)}
        </div>
      );
    },
  },
  {
    accessorKey: "dataConclusao",
    header: "Data de Conclusão",
    cell: ({ row }) => {
      const dataConclusao = row.getValue("dataConclusao") as string | undefined;
      
      if (!dataConclusao) {
        return (
          <div className="text-sm text-muted-foreground">
            Não concluído
          </div>
        );
      }
      
      return (
        <div className="text-sm text-foreground">
          {formatDate(dataConclusao)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const { icon: StatusIcon, color } = getStatusInfo(status);
      
      return (
        <Badge className={`${color} border-0`}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "notaFinal",
    header: "Nota Final",
    cell: ({ row }) => {
      const notaFinal = row.getValue("notaFinal") as number | undefined;
      
      return (
        <div className="text-sm font-medium text-foreground">
          {formatNota(notaFinal)}
        </div>
      );
    },
  },
  {
    accessorKey: "ativo",
    header: "Ativo",
    cell: ({ row }) => {
      const ativo = row.getValue("ativo") as boolean;
      return (
        <Badge variant={ativo ? "default" : "secondary"}>
          {ativo ? "Sim" : "Não"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const matricula = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                // Implementar visualização da matrícula
                console.log("Visualizar matrícula:", matricula.id);
              }}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Implementar edição da matrícula
                console.log("Editar matrícula:", matricula.id);
              }}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                // Implementar exclusão da matrícula
                console.log("Excluir matrícula:", matricula.id);
              }}
              className="cursor-pointer text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

import type { ColumnDef } from "@tanstack/react-table";
import type { Professor } from "../../../types/Professor";
import { ArrowUpDown, User, MoreHorizontal, Copy, Eye, Edit, Mail, Phone, Calendar, CheckCircle, XCircle, Book } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { Button } from "../../ui/button";


export const columns: ColumnDef<Professor>[] = [
    {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
            const professor = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(professor.id.toString())}
                            className="flex items-center gap-2"
                        >
                            <Copy className="w-4 h-4" />
                            Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="w-4 h-4" />
                            Editar professor
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
    {
        accessorKey: "nome",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nome Completo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const nomeCompleto = `${row.original.nome} ${row.original.sobrenome || ''}`.trim();
            return (
                <div className="font-medium text-foreground">
                    {nomeCompleto}
                </div>
            )
        },
        filterFn: "customNameFilter" as any,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-muted-foreground">
                    {row.original.email}
                </div>
            )
        },
        filterFn: "customEmailFilter" as any,
    },
    {
        accessorKey: "formacao",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    Formação
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-muted-foreground">
                    {row.original.formacao}
                </div>
            )
        },
        filterFn: "customFormacaoFilter" as any,
    },
    {
        accessorKey: "dataDeNascimento",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data de Nascimento
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            try {
                const data = new Date(row.original.dataDeNascimento);
                if (isNaN(data.getTime())) {
                    return (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            Não informado
                        </div>
                    );
                }
                return (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {data.toLocaleDateString('pt-BR')}
                    </div>
                );
            } catch (error) {
                return (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        Não informado
                    </div>
                );
            }
        },
        filterFn: "customDateFilter" as any,
    },
    {
        accessorKey: "dataContratacao",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data de Contratação
                </Button>
            )
        },
        cell: ({ row }) => {
            try {
                const data = new Date(row.original.dataContratacao);
                if (isNaN(data.getTime())) {
                    return (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            Não informado
                        </div>
                    );
                }
                return (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {data.toLocaleDateString('pt-BR')}
                    </div>
                );
            } catch (error) {
                return (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        Não informado
                    </div>
                );
            }
        },
        filterFn: "customDateFilter" as any,
    },
    {
        accessorKey: "ativo",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Ativo
                </Button>
            )
        },
    }
]
import type { ColumnDef } from "@tanstack/react-table";
import type { Aluno } from "../../../types/Aluno";
import { Button } from "../../ui/button"
import { ArrowUpDown, Mail, Phone, Calendar, User, CheckCircle, XCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { MoreHorizontal, Edit, Eye, Copy } from "lucide-react";

export const columns: ColumnDef<Aluno>[] = [
    {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
            const aluno = row.original

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
                            onClick={() => navigator.clipboard.writeText(aluno.id)}
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
                            Editar aluno
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    {
        accessorKey: "nome",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="font-medium text-foreground">
                    {row.original.nome}
                </div>
            )
        }
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
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {row.original.email}
                </div>
            )
        }
    },
    {
        accessorKey: "telefone",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telefone
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {row.original.telefone}
                </div>
            )
        }
    },
    {
        accessorKey: "dataNascimento",
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
            return (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {row.original.dataNascimento.toLocaleDateString('pt-BR')}
                </div>
            )
        }
    },
    {
        accessorKey: "ativo",
        header: "Status",
        cell: ({ row }) => {
            const isAtivo = row.original.ativo;
            return (
                <div className="flex items-center gap-2">
                    {isAtivo ? (
                        <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                Ativo
                            </span>
                        </>
                    ) : (
                        <>
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                Inativo
                            </span>
                        </>
                    )}
                </div>
            )
        }
    },
]

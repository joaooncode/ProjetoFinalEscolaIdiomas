import type { ColumnDef } from "@tanstack/react-table";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    type ColumnFiltersState,
    getFilteredRowModel,
    getSortedRowModel,
    type SortingState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table"
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Filter, Plus } from "lucide-react";
import type { MatriculaResumo } from "../../../types/Matricula";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onAddNew?: () => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onAddNew,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
        filterFns: {
            customNameFilter: (row, columnId, filterValue) => {
                const matricula = row.original as any;
                const nomeCompleto = `${matricula.alunoNome} ${matricula.alunoSobrenome || ''}`.toLowerCase();
                return nomeCompleto.includes(filterValue.toLowerCase());
            },
        },
    })

    return (
        <div className="w-full">
            {/* Header com Busca e Botão Adicionar */}
            <div className="flex items-center justify-between py-4 px-4 bg-muted/50 rounded-t-lg border-b border-border">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Pesquisar por nome do aluno..."
                        value={(table.getColumn("alunoNome")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn("alunoNome")?.setFilterValue(event.target.value)}
                        className="pl-10 border-input focus:border-ring focus:ring-ring"
                    />
                </div>
                
                {onAddNew && (
                    <Button 
                        onClick={onAddNew}
                        className="ml-4 bg-primary hover:bg-primary/90"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Matrícula
                    </Button>
                )}
            </div>

            {/* Table */}
            <div className="border border-border rounded-b-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="font-semibold text-foreground">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="hover:bg-muted/50 transition-colors">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                                    Nenhuma matrícula encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4 px-4 bg-muted/50 rounded-lg mt-4 border border-border">
                <div className="text-sm text-muted-foreground">
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => table.previousPage()} 
                        disabled={!table.getCanPreviousPage()}
                        className="flex items-center gap-1"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Anterior
                    </Button>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => table.nextPage()} 
                        disabled={!table.getCanNextPage()}
                        className="flex items-center gap-1"
                    >
                        Próxima
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

"use client"

import type React from "react"

import type { IMeta } from "../../../types/backend"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import PaginationCustomize from "@components/lib/Pagination"

export interface Column {
    key: string
    label: string
    sortable?: boolean
    render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
    data: any[]
    meta: IMeta
    columns: Column[]
}

export function TableCustomize({ data, meta, columns }: DataTableProps) {
    return (
        <div className="w-full space-y-4">
            <div className="rounded-lg border bg-card  border-slate-200 dark:border-transparent">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b border-slate-200 dark:border-transparent">
                                {columns.map((column) => (
                                    <TableHead
                                        key={column.key}
                                        className="h-12 px-4 text-left align-middle font-bold text-muted-foreground whitespace-nowrap min-w-[100px]"
                                    >
                                        {column.label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data && data.length > 0 ? (
                                data.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        className="border-b transition-colors bg-white dark:bg-zinc-900 hover:bg-muted/50 data-[state=selected]:bg-muted"
                                    >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.key}
                                                className="px-4 py-4 align-middle text-sm whitespace-nowrap"
                                            >
                                                {column.render ? column.render(row[column.key], row) : row[column.key]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="bg-white dark:bg-zinc-900">
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No data available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                </div>
            </div>

            {meta.pages >= 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                    <div className="text-sm text-muted-foreground order-2 sm:order-1">
                        Showing {(meta.current - 1) * meta.pageSize + 1} to {Math.min(meta.current * meta.pageSize, meta.total)} of{" "}
                        {meta.total} results
                    </div>
                    <PaginationCustomize meta={meta} />
                </div>
            )}
        </div>
    )
}

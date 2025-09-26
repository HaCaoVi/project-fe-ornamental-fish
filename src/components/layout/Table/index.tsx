"use client"

import type React from "react"

import type { IMeta } from "../../../types/backend"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@components/ui/pagination"
import { useRouter, useSearchParams } from "next/navigation"

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
    const router = useRouter()
    const searchParams = useSearchParams()

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("current", page.toString())
        params.set("pageSize", meta.pageSize.toString())
        router.push(`?${params.toString()}`)
    }

    return (
        <div className="w-full space-y-4">
            <div className="rounded-lg border bg-card  border-gray-200 dark:border-transparent">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b border-gray-200 dark:border-transparent">
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

                    <Pagination className="order-1 sm:order-2 justify-end flex-1">
                        <PaginationContent className="flex-wrap gap-1">
                            {/* Previous */}
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => {
                                        if (meta.current > 1) goToPage(meta.current - 1)
                                    }}
                                    className={`${meta.current <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-accent hover:text-accent-foreground"}`}
                                />
                            </PaginationItem>

                            {/* Page numbers with smart truncation */}
                            {(() => {
                                const pages = []
                                const totalPages = meta.pages
                                const current = meta.current

                                // Always show first page
                                if (totalPages > 0) {
                                    pages.push(
                                        <PaginationItem key={1}>
                                            <PaginationLink isActive={1 === current} onClick={() => goToPage(1)} className="cursor-pointer">
                                                1
                                            </PaginationLink>
                                        </PaginationItem>,
                                    )
                                }

                                // Add ellipsis if needed
                                if (current > 3) {
                                    pages.push(<PaginationEllipsis key="ellipsis-start" />)
                                }

                                for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
                                    pages.push(
                                        <PaginationItem key={i}>
                                            <PaginationLink isActive={i === current} onClick={() => goToPage(i)} className="cursor-pointer">
                                                {i}
                                            </PaginationLink>
                                        </PaginationItem>,
                                    )
                                }

                                // Add ellipsis if needed
                                if (current < totalPages - 2) {
                                    pages.push(<PaginationEllipsis key="ellipsis-end" />)
                                }

                                // Always show last page if more than 1 page
                                if (totalPages > 1) {
                                    pages.push(
                                        <PaginationItem key={totalPages}>
                                            <PaginationLink
                                                isActive={totalPages === current}
                                                onClick={() => goToPage(totalPages)}
                                                className="cursor-pointer"
                                            >
                                                {totalPages}
                                            </PaginationLink>
                                        </PaginationItem>,
                                    )
                                }

                                return pages
                            })()}

                            {/* Next */}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => {
                                        if (meta.current < meta.pages) goToPage(meta.current + 1)
                                    }}
                                    className={`${meta.current >= meta.pages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-accent hover:text-accent-foreground"}`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}

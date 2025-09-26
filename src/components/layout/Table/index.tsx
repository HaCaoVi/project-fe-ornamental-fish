"use client"

import { IMeta } from "../../../types/backend"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@components/ui/pagination"
import { useRouter, useSearchParams } from 'next/navigation'

export interface Column {
    key: string,
    label: string,
    sortable?: boolean,
    render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
    data: any[],
    meta: IMeta,
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
        <>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.key} className="w-[100px]">{column.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.length > 0 && data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                <TableCell key={column.key} className="py-3">
                                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination className="flex justify-end">
                <PaginationContent>
                    {/* Previous */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => {
                                if (meta.current > 1) goToPage(meta.current - 1)
                            }}
                        />
                    </PaginationItem>

                    {Array.from({ length: meta.pages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === meta.current}
                                onClick={() => {
                                    goToPage(page)
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {meta.pages > 5 && <PaginationEllipsis />}

                    {/* Next */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={(e) => {
                                e.preventDefault()
                                if (meta.current < meta.pages) goToPage(meta.current + 1)
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

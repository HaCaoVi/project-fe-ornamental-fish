"use client"

import * as React from "react"
import { ChevronUpIcon, ChevronDownIcon, EditIcon, TrashIcon, SearchIcon } from "lucide-react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@components/ui/pagination"
import { cn } from "@lib/utils"

export interface Column {
    key: string
    label: string
    sortable?: boolean
    render?: (value: any, row: any) => React.ReactNode
}

export interface DataTableProps {
    data: any[]
    columns: Column[]
    totalItems?: number
    onEdit?: (row: any) => void
    onDelete?: (row: any) => void
    className?: string
}

type SortDirection = "asc" | "desc" | null

export function TableCustomize({ data, columns, totalItems, onEdit, onDelete, className }: DataTableProps) {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [sortColumn, setSortColumn] = React.useState<string | null>(null)
    const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [pageSize, setPageSize] = React.useState(10)

    // Filter data based on search term
    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data

        return data.filter((row) =>
            columns.some((column) => {
                const value = row[column.key]
                return value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            }),
        )
    }, [data, searchTerm, columns])

    // Sort filtered data
    const sortedData = React.useMemo(() => {
        if (!sortColumn || !sortDirection) return filteredData

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortColumn]
            const bValue = b[sortColumn]

            if (aValue === bValue) return 0

            const comparison = aValue < bValue ? -1 : 1
            return sortDirection === "asc" ? comparison : -comparison
        })
    }, [filteredData, sortColumn, sortDirection])

    // Paginate sorted data
    const paginatedData = React.useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize
        return sortedData.slice(startIndex, startIndex + pageSize)
    }, [sortedData, currentPage, pageSize])

    const totalPages = Math.ceil(sortedData.length / pageSize)
    const totalCount = totalItems || sortedData.length

    const handleSort = (columnKey: string) => {
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc")
            if (sortDirection === "desc") {
                setSortColumn(null)
            }
        } else {
            setSortColumn(columnKey)
            setSortDirection("asc")
        }
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize)
        setCurrentPage(1)
    }

    const getSortIcon = (columnKey: string) => {
        if (sortColumn !== columnKey) {
            return <ChevronUpIcon className="ml-2 h-4 w-4 opacity-50" />
        }
        return sortDirection === "asc" ? (
            <ChevronUpIcon className="ml-2 h-4 w-4" />
        ) : (
            <ChevronDownIcon className="ml-2 h-4 w-4" />
        )
    }

    const renderPaginationItems = () => {
        const items = []
        const maxVisiblePages = 5

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink onClick={() => handlePageChange(i)} isActive={currentPage === i} className="cursor-pointer">
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            )
        }

        return items
    }

    return (
        <div className={cn("space-y-4", className)}>
            {/* Search Input */}
            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto bg-transparent">
                            {pageSize} per page
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {[10, 20, 50].map((size) => (
                            <DropdownMenuItem key={size} onClick={() => handlePageSizeChange(size)}>
                                {size} per page
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            <div className="rounded-lg border bg-card shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.key} className="font-semibold">
                                    {column.sortable ? (
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleSort(column.key)}
                                            className="h-auto p-0 font-semibold hover:bg-transparent"
                                        >
                                            {column.label}
                                            {getSortIcon(column.key)}
                                        </Button>
                                    ) : (
                                        column.label
                                    )}
                                </TableHead>
                            ))}
                            {(onEdit || onDelete) && <TableHead className="w-[100px] font-semibold">Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    No results found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((row, index) => (
                                <TableRow key={index} className="hover:bg-muted/50">
                                    {columns.map((column) => (
                                        <TableCell key={column.key} className="py-3">
                                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                                        </TableCell>
                                    ))}
                                    {(onEdit || onDelete) && (
                                        <TableCell className="py-3">
                                            <div className="flex items-center space-x-2">
                                                {onEdit && (
                                                    <Button variant="ghost" size="sm" onClick={() => onEdit(row)} className="h-8 w-8 p-0">
                                                        <EditIcon className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                )}
                                                {onDelete && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => onDelete(row)}
                                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing {Math.min((currentPage - 1) * pageSize + 1, totalCount)} to{" "}
                        {Math.min(currentPage * pageSize, totalCount)} of {totalCount} results
                    </div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    className={cn("cursor-pointer", currentPage === 1 && "pointer-events-none opacity-50")}
                                />
                            </PaginationItem>
                            {renderPaginationItems()}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                    className={cn("cursor-pointer", currentPage === totalPages && "pointer-events-none opacity-50")}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}

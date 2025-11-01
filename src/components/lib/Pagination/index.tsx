import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@components/ui/pagination"
import { useRouter, useSearchParams } from "next/navigation"
import { IMeta } from "../../../types/backend"
import { JSX } from "react"

interface IProps {
    meta: IMeta
}
const PaginationCustomize = ({ meta }: IProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("current", page.toString())
        params.set("pageSize", meta.pageSize.toString())
        router.push(`?${params.toString()}`)
    }

    return (
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
                    const pages: JSX.Element[] = []
                    const totalPages = meta.pages
                    const current = meta.current

                    // Always show first page
                    if (totalPages > 0) {
                        pages.push(
                            <PaginationItem key={1}>
                                <PaginationLink
                                    isActive={1 === current}
                                    onClick={() => goToPage(1)}
                                    className="cursor-pointer"
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }

                    // Add ellipsis if needed
                    if (current > 3) {
                        pages.push(<PaginationEllipsis key="ellipsis-start" />)
                    }

                    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
                        pages.push(
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={i === current}
                                    onClick={() => goToPage(i)}
                                    className="cursor-pointer"
                                >
                                    {i}
                                </PaginationLink>
                            </PaginationItem>
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
                            </PaginationItem>
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
    )
}

export default PaginationCustomize;
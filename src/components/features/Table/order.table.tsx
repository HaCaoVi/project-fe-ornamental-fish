"use client"

import { useEffect, useState } from "react"
import { type Column, TableCustomize } from "@components/layout/Table"
import type { IMeta } from "../../../types/backend"
import { Search, Filter, FileSearch2, FileMinus } from "lucide-react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from "next/navigation"
import { IOrder } from "../../../types/model"
import { Input } from "@components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { useAppContext } from "@hooks/app.hook"
import { Badge } from "@components/ui/badge"

import { DeleteButton } from "@components/lib/DeleteButton"
import { OrderDetailsModal } from "../Modal/Order/order"
import { updateStatusOrderAPI } from "@lib/api/order"
import { notify } from "@lib/helpers/notify"

interface IProps {
    data: any[]
    meta: IMeta,
}

const OrderTable = ({ data, meta }: IProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const { categories } = useAppContext();
    const [categoryFilter, setCategoryFilter] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("*");
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [item, setItem] = useState<IOrder | null>(null);

    useEffect(() => {
        const categoryIdFromUrl = searchParams.get("category");
        if (categoryIdFromUrl) {
            setCategoryFilter(categoryIdFromUrl);
        } else if (categories?.length) {
            setCategoryFilter(categories[0]._id);
        }
    }, [categories]);

    useEffect(() => {

        const params = new URLSearchParams(searchParams.toString());

        if (searchTerm) params.set('search', searchTerm);
        else params.delete('search');

        if (filters && Object.keys(filters).length > 0) {
            params.set("filters", JSON.stringify(filters));
        } else {
            params.delete("filters");
        }

        const newUrl = `?${params.toString()}`;
        const currentUrl = `?${searchParams.toString()}`;
        if (newUrl !== currentUrl) {
            router.replace(newUrl);
        }
    }, [searchTerm, categoryFilter, categories, filters]);

    const handleFilterChange = (value: string) => {
        setSelectedFilter(value);

        switch (value) {
            case "PENDING":
                setFilters({ status: value });
                break;
            case "APPROVED":
                setFilters({ status: value });
                break;
            case "REJECTED":
                setFilters({ status: value });
                break;
            default:
                setFilters({});
        }
    };

    const resetFilters = () => {
        setSearchTerm("");
        setCategoryFilter(categories[0]._id);
        setSelectedFilter("*")
        setFilters({})
    }

    useEffect(() => {
        if (!isModalOpen && item) {
            setItem(null)
        }
    }, [item, isModalOpen])

    const handelRejectOrder = async (orderId: string) => {
        try {
            const res = await updateStatusOrderAPI(orderId, "REJECTED");
            if (res.statusCode === 200) {
                notify.success(res.message)
            } else {
                notify.warning(res.message)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const columns: Column[] = [
        {
            key: "code",
            label: "Code",
            render: (value) => (
                <div className="max-w-xs">
                    <p className="text-sm font-mono font-medium text-primary leading-relaxed line-clamp-2">{value}</p>
                </div>
            ),
        },
        {
            key: "fullname",
            label: "Fullname",
            render: (value) => (
                <div className="max-w-xs">
                    <p className="text-sm font-medium text-foreground leading-relaxed line-clamp-2">{value || "No name"}</p>
                </div>
            ),
        },
        {
            key: "user",
            label: "Email",
            render: (value, row: IOrder) => (
                <div className="max-w-xs">
                    <p className="text-sm font-medium text-foreground leading-relaxed line-clamp-2">{row.user.email}</p>
                </div>
            ),
        },
        {
            key: "phone",
            label: "Phone",
            render: (value) => {
                return (
                    <div className="max-w-xs">
                        <p className="text-sm font-medium text-foreground leading-relaxed line-clamp-2">{value}</p>
                    </div>
                )
            },
        },
        {
            key: "totalAmount",
            label: "Total (VNĐ)",
            render: (value, row: IOrder) => {
                return (
                    <div className="text-start space-x-2">
                        <div className="text-sm font-semibold text-foreground">{(row.totalAmount + row.shippingFee).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>
                    </div>
                );
            },
        },
        {
            key: "payment",
            label: "Payment",
            render: (value, row: IOrder) => {
                return (
                    <div className="max-w-xs text-center">
                        <p className="text-sm font-medium text-foreground leading-relaxed line-clamp-2">{row.payment.method}</p>
                    </div>
                )
            },
        },
        {
            key: "status",
            label: "Status",
            render: (value, row: IOrder) => {
                return (
                    <Badge
                        variant={value ? "default" : "secondary"}
                        className={`font-medium 
                            ${value === "PENDING"
                                ? "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800" :
                                value === "APPROVED"
                                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800" :
                                    value === "REJECTED"
                                        ? "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-950/50 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                            }`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${value === "PENDING" ? "bg-amber-500 animate-pulse" :
                            value === "APPROVED" ? "bg-emerald-500 animate-pulse" :
                                value === "REJECTED" ? "bg-red-500 animate-pulse" : "bg-slate-400"}`} />
                        {value}
                    </Badge>
                )
            },
        },
        {
            key: "createdAt",
            label: "Created At",
            render: (value, row) => {
                return (
                    <div className="text-sm text-muted-foreground tabular-nums">
                        {dayjs(value).format("MMM DD, YYYY")}
                        <div className="text-xs text-muted-foreground/70 mt-0.5">{dayjs(value).format("HH:mm")}</div>
                    </div>
                )
            },
        },
        {
            key: "updatedBy",
            label: "Order handler",
            render: (value, row: IOrder) => (
                <div className="text-sm text-muted-foreground tabular-nums text-center">
                    {row?.updatedBy?.email || "No one"}
                </div>
            ),
        },
        {
            key: "action",
            label: "Actions",
            render: (value, row: IOrder) => {
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => {
                                setIsModalOpen(true)
                                setItem(row)
                            }
                            }
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 rounded-lg group border border-transparent hover:border-primary/20"
                            title="View detail"
                        >
                            <FileSearch2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span className="sr-only">View detail</span>
                        </Button>
                        {row.status === "PENDING" ?
                            <DeleteButton icon={<FileMinus />} title="Reject order" id={row._id} onDelete={handelRejectOrder} />
                            : null}
                    </div>
                )
            },
        },
    ]

    return (
        <div className="max-h-screen from-slate-50 via-white to-slate-50  dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="container mx-auto py-8">
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                                Order Management
                            </h1>
                            <p className="text-lg text-muted-foreground font-medium">
                                Manage order your system
                            </p>
                        </div>
                    </div>

                    <Card className="border border-slate-200 py-3 shadow-lg bg-white/80 dark:border-transparent dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl">
                        <CardContent className="px-6">
                            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1 w-full lg:w-auto">
                                    <div className="relative flex-1 max-w-md w-full sm:w-auto">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                        <Input
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-12 h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200"
                                        />
                                    </div>

                                    <div className="flex gap-3 items-center flex-wrap">
                                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                                            <Filter className="h-4 w-4" />
                                            <span>Filters:</span>
                                        </div>
                                        <Select value={selectedFilter} onValueChange={handleFilterChange}>
                                            <SelectTrigger className="w-[140px] h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                <SelectItem value="*">All</SelectItem>
                                                <SelectItem value="PENDING">Pending</SelectItem>
                                                <SelectItem value="APPROVED">Approved</SelectItem>
                                                <SelectItem value="REJECTED">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={resetFilters}
                                    className="whitespace-nowrap h-10 px-6 rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-all duration-200 bg-transparent"
                                >
                                    Clear All
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200 py-3 shadow-xl bg-white dark:border-transparent dark:bg-slate-900/50  rounded-2xl overflow-hidden p-5">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                                Order Overview ({meta.total} {meta.total <= 1 ? "order" : "orders"})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <TableCustomize data={data} meta={meta} columns={columns} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/* Modal */}
            <OrderDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={item} />
        </div>
    )
}

export default OrderTable;

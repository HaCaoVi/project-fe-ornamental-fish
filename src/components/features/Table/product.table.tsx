"use client"

import { useEffect, useState } from "react"
import { type Column, TableCustomize } from "@components/layout/Table"
import type { IMeta } from "../../../types/backend"
import { Pencil, Trash2, Plus, Search, Filter, Fish, Utensils, Package, OctagonAlert, } from "lucide-react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from "next/navigation"
import { IProduct } from "../../../types/model"
import { notify } from "@lib/helpers/notify"
import { Input } from "@components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { useAppContext } from "@hooks/app.hook"
import { deleteCategoryAPI } from "@lib/api/category"
import Image from "next/image"
import { Badge } from "@components/ui/badge"
import { calculateDiscountPercent, formatNumberFollowKAndM } from "@lib/helpers/convert.helper"
import { ProductModal } from "../Modal/Product/create-product"

interface IProps {
    data: any[]
    meta: IMeta,
}

const ProductTable = ({ data, meta }: IProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const { categories } = useAppContext();
    const [categoryFilter, setCategoryFilter] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("*");
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [item, setItem] = useState<IProduct | null>(null);

    useEffect(() => {
        const categoryIdFromUrl = searchParams.get("category");
        if (categoryIdFromUrl) {
            setCategoryFilter(categoryIdFromUrl);
        } else if (categories?.length) {
            setCategoryFilter(categories[0]._id);
        }
    }, [categories]);

    useEffect(() => {
        if (!categories?.length) return;

        const params = new URLSearchParams(searchParams.toString());
        const currentCategoryId = params.get('category');

        if (!currentCategoryId || !currentCategoryId.length) {
            params.set('category', categories[0]._id);
        }

        if (categoryFilter && categoryFilter !== currentCategoryId) {
            params.set('category', categoryFilter);
        }

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
            case "active":
                setFilters({ isActivated: true });
                break;
            case "inactive":
                setFilters({ isActivated: false });
                break;
            case "discount":
                setFilters({ discount: { $gt: 0 } });
                break;
            default:
                setFilters({});
        }
    };

    const handleDeleteCategoryDetail = async (categoryDetailId: string) => {
        try {
            const res = await deleteCategoryAPI(categoryDetailId)
            if (res.statusCode === 200) {
                notify.success(res.message)
            }
        } catch (error) {
            console.error("Delete category detail error: ", error);
        }
    }

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
            key: "mainImageUrl",
            label: "Picture",
            render: (value) => (
                <div className="relative h-16 w-24 overflow-hidden rounded-lg border border-border bg-muted/30 transition-all duration-200 hover:shadow-md hover:scale-105">
                    <Image src={value || "/placeholder.svg"} alt={"picture"} fill className="object-cover" sizes="96px" />
                </div>
            ),
        },
        {
            key: "name",
            label: "Name",
            render: (value) => (
                <div className="max-w-xs">
                    <p className="text-sm font-medium text-foreground leading-relaxed line-clamp-2">{value || "No name"}</p>
                </div>
            ),
        },
        {
            key: "categoryDetail",
            label: "Type",
            render: (value, row) => {
                return (
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-secondary/50 border border-border">
                        <span className="text-sm font-medium text-secondary-foreground">{row.categoryDetail.name}</span>
                    </div>
                )
            },
        },
        {
            key: "price",
            label: "Price (VNĐ)",
            render: (value, row: IProduct) => {
                const price = typeof value === "number" ? value : 0;
                const discount = typeof row.discount === "number" ? row.discount : 0;

                const finalPrice = price - discount;

                const formattedPrice = price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
                const formattedFinalPrice = finalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

                return (
                    <div className="text-start space-x-2">
                        {discount !== 0 && <div className="text-sm text-gray-400 line-through">{formattedPrice}</div>}
                        <div className="text-sm font-semibold text-foreground">{formattedFinalPrice}</div>
                    </div>
                );
            },
        },
        {
            key: "discount",
            label: "Discount",
            render: (value, row: IProduct) => {
                return (
                    <div className="text-start">
                        {value > 0 ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 text-xs font-semibold tabular-nums">
                                {calculateDiscountPercent(value, row.price)}%
                            </span>
                        ) : (
                            <span className="text-sm text-muted-foreground tabular-nums">0%</span>
                        )}
                    </div>
                )
            },
        },
        {
            key: "quantity",
            label: "Quantity",
            render: (value, row) => {
                const quantity = row.stock.quantity
                const isLowStock = quantity < 15
                return (
                    <div className="text-start flex items-center">
                        <span
                            className={`text-sm font-medium tabular-nums ${isLowStock ? "text-red-600 dark:text-red-400" : "text-foreground"}`}
                        >
                            {formatNumberFollowKAndM(quantity)}
                        </span>
                        {isLowStock && <span className="ml-1 text-xs text-orange-600 dark:text-red-400"><OctagonAlert size={15} /></span>}
                    </div>
                )
            },
        },
        {
            key: "sold",
            label: "Sold",
            render: (value, row) => {
                return (
                    <div className="text-start">
                        <span className="text-sm font-medium text-muted-foreground tabular-nums">
                            {formatNumberFollowKAndM(row.stock.sold)}
                        </span>
                    </div>
                )
            },
        },
        {
            key: "isActivated",
            label: "Status",
            render: (value) => (
                <Badge
                    variant={value ? "default" : "secondary"}
                    className={`font-medium ${value
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-950/50 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                        }`}
                >
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${value ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                    {value ? "Active" : "Inactive"}
                </Badge>
            ),
        },
        {
            key: "updatedAt",
            label: "Updated At",
            render: (value) => (
                <div className="text-sm text-muted-foreground tabular-nums">
                    {dayjs(value).format("MMM DD, YYYY")}
                    <div className="text-xs text-muted-foreground/70 mt-0.5">{dayjs(value).format("HH:mm")}</div>
                </div>
            ),
        },
        {
            key: "action",
            label: "Actions",
            render: (value, row) => {
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
                            title="Edit product"
                        >
                            <Pencil className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span className="sr-only">Edit product</span>
                        </Button>

                        <Button
                            onClick={() => console.log("[v0] Delete:", row._id)}
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 rounded-lg group border border-transparent hover:border-destructive/20"
                            title="Delete product"
                        >
                            <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span className="sr-only">Delete product</span>
                        </Button>
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
                                Product Management
                            </h1>
                            <p className="text-lg text-muted-foreground font-medium">
                                Manage product your system
                            </p>
                        </div>
                        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Product
                        </Button>
                    </div>

                    <Card className="border border-slate-200 shadow-lg bg-white/80 dark:border-transparent dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl">
                        <CardContent className="px-6">
                            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1 w-full lg:w-auto">
                                    <div className="relative flex-1 max-w-md w-full sm:w-auto">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                        <Input
                                            placeholder="Search roles and descriptions..."
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
                                                <SelectItem value="*">Choose filter</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                                <SelectItem value="discount">Discount</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                            <SelectTrigger className="w-[160px] h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                                <SelectValue
                                                    placeholder={
                                                        categories.find(c => c._id === categoryFilter)?.name || "Select category"
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                {categories.length > 0 && categories.map((item) => (
                                                    <SelectItem key={item._id} value={item._id}>{item.name}</SelectItem>
                                                ))}
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

                    <Card className="border border-slate-200 shadow-xl bg-white dark:border-transparent dark:bg-slate-900/50  rounded-2xl overflow-hidden p-5">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                                Product Overview ({meta.total} {meta.total <= 1 ? "product" : "products"})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <TableCustomize data={data} meta={meta} columns={columns} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            <ProductModal onOpenChange={setIsModalOpen} open={isModalOpen} categories={categories} item={item} />
        </div>
    )
}

export default ProductTable;

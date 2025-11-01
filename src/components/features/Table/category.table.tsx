"use client"

import { useEffect, useState } from "react"
import { type Column, TableCustomize } from "@components/layout/Table"
import type { IMeta } from "../../../types/backend"
import { Pencil, Trash2, Plus, Search, Filter, Fish, Utensils, Package, } from "lucide-react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from "next/navigation"
import { ICategoryDetail } from "../../../types/model"
import { notify } from "@lib/helpers/notify"
import { getRoleConfig } from "./user.table"
import { Input } from "@components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { useAppContext } from "@hooks/app.hook"
import { CUCategoryDetailModel } from "../Modal/Category/create-category.modal"
import { deleteCategoryAPI } from "@lib/api/category"
import { DeleteButton } from "@components/lib/DeleteButton"

interface IProps {
    data: any[]
    meta: IMeta,
}

export const getCategoryConfig = (categoryName: string) => {
    const name = categoryName?.toLowerCase()

    if (name === "ornamental fish") {
        return {
            icon: Fish,
            className:
                "bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-700 border-cyan-200 dark:from-cyan-950/50 dark:to-cyan-900/50 dark:text-cyan-300 dark:border-cyan-800",
            dotColor: "bg-cyan-500",
        }
    } else if (name === "aquarium fish food") {
        return {
            icon: Utensils,
            className:
                "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border-amber-200 dark:from-amber-950/50 dark:to-amber-900/50 dark:text-amber-300 dark:border-amber-800",
            dotColor: "bg-amber-500",
        }
    } else if (name === "accessory") {
        return {
            icon: Package,
            className:
                "bg-gradient-to-r from-rose-50 to-rose-100 text-rose-700 border-rose-200 dark:from-rose-950/50 dark:to-rose-900/50 dark:text-rose-300 dark:border-rose-800",
            dotColor: "bg-rose-500",
        }
    }

    // default
    return {
        icon: Package,
        className:
            "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 border-slate-200 dark:from-slate-950/50 dark:to-slate-900/50 dark:text-slate-300 dark:border-slate-800",
        dotColor: "bg-slate-500",
    }
}

const CategoryTable = ({ data, meta }: IProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("*");
    const { categories } = useAppContext()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [editingCategory, setEditingCategory] = useState<ICategoryDetail | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (searchTerm) params.set("search", searchTerm);
        else params.delete("search");

        let filters: any = {};
        if (categoryFilter !== "*") filters.category = categoryFilter;

        if (Object.keys(filters).length > 0) {
            params.set("filters", JSON.stringify(filters));
        } else {
            params.delete("filters");
        }

        router.push(`?${params.toString()}`);
    }, [searchTerm, categoryFilter]);


    const handleDeleteCategoryDetail = async (categoryDetailId: string) => {
        try {
            const res = await deleteCategoryAPI(categoryDetailId)
            if (res.statusCode === 200) {
                notify.success(res.message)
            } else {
                notify.warning(res.message)
            }
        } catch (error) {
            console.error("Delete category detail error: ", error);
        }
    }

    const resetFilters = () => {
        setSearchTerm("");
        setCategoryFilter("*");
    }

    useEffect(() => {
        if (!isModalOpen && editingCategory) {
            setEditingCategory(null)
        }
    }, [editingCategory, isModalOpen])

    const columns: Column[] = [
        {
            key: "_id",
            label: "ID",
            render: (value) => (
                <div className="max-w-xs">
                    <p className="text-sm font-mono font-medium text-primary leading-relaxed line-clamp-2">{value}</p>
                </div>
            ),
        },
        {
            key: "name",
            label: "Name",
            render: (value) => (
                <div className="max-w-xs">
                    <p className="text-md font-medium dark:text-white text-muted-foreground leading-relaxed line-clamp-2">
                        {value || "No description provided"}
                    </p>
                </div>
            ),
        },
        {
            key: "category",
            label: "Category",
            render: (value, row: ICategoryDetail) => {
                const config = getCategoryConfig(row.category.name)
                const IconComponent = config.icon
                return (
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border font-medium text-sm transition-all duration-200 hover:shadow-sm ${config.className}`}
                        >
                            <IconComponent className="h-4 w-4" />
                            <span className="font-semibold">{row.category.name}</span>
                        </div>
                    </div>
                )
            },
        },
        {
            key: "createdBy",
            label: "Created By",
            render: (value, row: ICategoryDetail) => {
                const config = getRoleConfig(row.createdBy.role.name)
                const IconComponent = config.icon
                return (
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border font-medium text-sm transition-all duration-200 hover:shadow-sm ${config.className}`}
                        >
                            <IconComponent className="h-4 w-4" />
                            <span className="font-semibold">{row.createdBy.email}</span>
                        </div>
                    </div>
                )
            },
        },
        {
            key: "updatedBy",
            label: "Updated By",
            render: (value, row: ICategoryDetail) => {
                if (!row.updatedBy) {
                    return <span className="text-gray-400 italic">Not updated</span>;
                }

                const config = getRoleConfig(row.updatedBy.role.name);
                const IconComponent = config.icon;

                return (
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border font-medium text-sm transition-all duration-200 hover:shadow-sm ${config.className}`}
                        >
                            {IconComponent && <IconComponent className="h-4 w-4" />}
                            <span className="font-semibold">{row.updatedBy.email}</span>
                        </div>
                    </div>
                );
            },
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
            render: (value, row: ICategoryDetail) => {
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => {
                                setIsModalOpen(true)
                                setEditingCategory(row)
                            }
                            }
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 transition-all duration-200 rounded-lg group border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                            title="Edit user"
                        >
                            <Pencil className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span className="sr-only">Edit category detail</span>

                        </Button>
                        <DeleteButton id={row._id} onDelete={handleDeleteCategoryDetail} />
                    </div >
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
                                Category Management
                            </h1>
                            <p className="text-lg text-muted-foreground font-medium">
                                Manage category your system
                            </p>
                        </div>
                        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Category
                        </Button>
                    </div>

                    <Card className="border border-slate-200 py-3 shadow-lg bg-white/80 dark:border-transparent dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl">
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

                                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                            <SelectTrigger className="w-[160px] h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                                <SelectValue placeholder="Role Type" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                <SelectItem value="*">All Category</SelectItem>
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

                    <Card className="border border-slate-200 py-3 shadow-xl bg-white dark:border-transparent dark:bg-slate-900/50  rounded-2xl overflow-hidden p-5">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                                Categories Overview ({meta.total} {meta.total <= 1 ? "category" : "categories"})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <TableCustomize data={data} meta={meta} columns={columns} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            <CUCategoryDetailModel onOpenChange={setIsModalOpen} open={isModalOpen} categories={categories} item={editingCategory} />
        </div>
    )
}

export default CategoryTable;

"use client"

import { useState } from "react"
import { type Column, TableCustomize } from "@components/layout/Table"
import type { IMeta } from "../../../types/backend"
import { Pencil, Trash2, Plus, Search, Filter, Users, Shield, UserCheck } from "lucide-react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@components/ui/dialog"
import { Label } from "@components/ui/label"
import { Textarea } from "@components/ui/textarea"
import { Switch } from "@components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import dayjs from 'dayjs';
import CreateRoleModal from "../Modal/Role/create-role.modal"

interface IProps {
    data: any[]
    meta: IMeta
}

const RoleTable = ({ data, meta }: IProps) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [roleFilter, setRoleFilter] = useState("all")
    const [isModalOpen, setIsModalOpen] = useState(false)


    const filteredData = data.filter((item) => {
        const matchesSearch =
            item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && item.isActive) ||
            (statusFilter === "inactive" && !item.isActive)

        const matchesRole = roleFilter === "all" || item.name?.toLowerCase() === roleFilter.toLowerCase()

        return matchesSearch && matchesStatus && matchesRole
    })


    const resetFilters = () => {
        setSearchTerm("")
        setStatusFilter("all")
        setRoleFilter("all")
    }

    const getRoleConfig = (roleName: string) => {
        const name = roleName?.toLowerCase()

        if (name === "admin") {
            return {
                icon: Shield,
                className:
                    "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200 dark:from-purple-950/50 dark:to-purple-900/50 dark:text-purple-300 dark:border-purple-800",
                dotColor: "bg-purple-500",
            }
        } else if (name === "staff") {
            return {
                icon: Users,
                className:
                    "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200 dark:from-blue-950/50 dark:to-blue-900/50 dark:text-blue-300 dark:border-blue-800",
                dotColor: "bg-blue-500",
            }
        } else if (name === "customer") {
            return {
                icon: UserCheck,
                className:
                    "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200 dark:from-emerald-950/50 dark:to-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800",
                dotColor: "bg-emerald-500",
            }
        }

        return {
            icon: Users,
            className:
                "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 border-slate-200 dark:from-slate-950/50 dark:to-slate-900/50 dark:text-slate-300 dark:border-slate-800",
            dotColor: "bg-slate-500",
        }
    }

    const columns: Column[] = [
        {
            key: "_id",
            label: "ID",
        },
        {
            key: "name",
            label: "Role Name",
            sortable: true,
            render: (value) => {
                const config = getRoleConfig(value)
                const IconComponent = config.icon

                return (
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border font-medium text-sm transition-all duration-200 hover:shadow-sm ${config.className}`}
                        >
                            <IconComponent className="h-4 w-4" />
                            <span className="font-semibold">{value}</span>
                        </div>
                    </div>
                )
            },
        },
        {
            key: "description",
            label: "Description",
            render: (value) => (
                <div className="max-w-xs">
                    <p className="text-md dark:text-white text-muted-foreground leading-relaxed line-clamp-2">
                        {value || "No description provided"}
                    </p>
                </div>
            ),
        },
        {
            key: "isActive",
            label: "Status",
            render: (value) => (
                <Badge
                    variant={value ? "default" : "secondary"}
                    className={`font-medium ${value
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-950/50 dark:text-slate-400 border-slate-200 dark:border-slate-800"
                        }`}
                >
                    <div className={`w-2 h-2 rounded-full mr-2 ${value ? "bg-emerald-500" : "bg-slate-400"}`} />
                    {value ? "Active" : "Inactive"}
                </Badge>
            ),
        },
        {
            key: "createdAt",
            label: "Created",
            render: (value) => (
                <div>{dayjs(value).format('DD-MM-YYYY HH:mm:ss')}</div>
            ),
        },
        {
            key: "updatedAt",
            label: "Updated",
            render: (value) => (
                <div>{dayjs(value).format('DD-MM-YYYY HH:mm:ss')}</div>
            ),
        },
        {
            key: "action",
            label: "Actions",
            render: (value, row) => {
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 transition-all duration-200 rounded-lg group border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                            title="Edit role"
                        >
                            <Pencil className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span className="sr-only">Edit role</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-all duration-200 rounded-lg group border border-transparent hover:border-red-200 dark:hover:border-red-800"
                            title="Delete role"
                        >
                            <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span className="sr-only">Delete role</span>
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
                                Role Management
                            </h1>
                            <p className="text-lg text-muted-foreground font-medium">
                                Manage user roles and permissions across your system
                            </p>
                        </div>
                        <CreateRoleModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
                    </div>

                    <Card className="border border-gray-200 shadow-lg bg-white/80 dark:border-transparent dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl">
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

                                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                                            <SelectTrigger className="w-[140px] h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                <SelectItem value="all">All Status</SelectItem>
                                                <SelectItem value="active">Active Only</SelectItem>
                                                <SelectItem value="inactive">Inactive Only</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                                            <SelectTrigger className="w-[140px] h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                                <SelectValue placeholder="Role Type" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                <SelectItem value="all">All Roles</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="staff">Staff</SelectItem>
                                                <SelectItem value="customer">Customer</SelectItem>
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

                    <Card className="border border-gray-200 shadow-xl bg-white dark:border-transparent dark:bg-slate-900/50  rounded-2xl overflow-hidden p-5">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                                Roles Overview ({filteredData.length} {filteredData.length === 1 ? "role" : "roles"})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <TableCustomize data={filteredData} meta={meta} columns={columns} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default RoleTable

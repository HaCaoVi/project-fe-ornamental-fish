"use client"

import { useEffect, useState } from "react"
import { type Column, TableCustomize } from "@components/layout/Table"
import type { IMeta } from "../../../types/backend"
import { Pencil, Plus, Search, Filter, Users, Shield, LockKeyhole, LockKeyholeOpen } from "lucide-react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import dayjs from 'dayjs';
import { listRoleAPI } from "@lib/api/role"
import { useRouter, useSearchParams } from "next/navigation"
import { IRole, IUser } from "../../../types/model"
import { CreateUserModal } from "../Modal/User/create-user.modal"
import { UpdateUserModal } from "../Modal/User/update-user.modal"
import { banOrUnBanUserAPI, deleteUserAPI } from "@lib/api/user"
import { notify } from "@lib/helpers/notify"
import { DeleteButton } from "@components/lib/DeleteButton"

interface IProps {
    data: any[]
    meta: IMeta
}

export const getRoleConfig = (roleName: string) => {
    const name = roleName?.toLowerCase()

    if (name === "admin") {
        return {
            icon: Shield,
            className:
                "bg-gradient-to-r from-purple-50 to-purple-100 text-[#8e44ad] border-purple-200 dark:from-purple-950/50 dark:to-purple-900/50 dark:text-purple-300 dark:border-purple-800",
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
            icon: Users,
            className:
                "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 border-slate-200 dark:from-slate-950/50 dark:to-slate-900/50 dark:text-slate-300 dark:border-slate-800",
            dotColor: "bg-slate-500",
        }
    }

    return {
        icon: Users,
        className:
            "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 border-slate-200 dark:from-slate-950/50 dark:to-slate-900/50 dark:text-slate-300 dark:border-slate-800",
        dotColor: "bg-slate-500",
    }
}

const UserTable = ({ data, meta }: IProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("*");
    const [roleFilter, setRoleFilter] = useState("*");
    const [listRole, setListRole] = useState<IRole[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [editingUser, setEditingUser] = useState<IUser | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await listRoleAPI();
                if (res.statusCode === 200 && res.data) {
                    setListRole(res.data)
                }
            } catch (error) {
                console.error("Fetch role error: ", error);
            }
        })()
    }, [])

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (searchTerm) params.set("search", searchTerm);
        else params.delete("search");

        let filters: any = {};
        if (statusFilter !== "*") filters.isActivated = statusFilter === "active";
        if (roleFilter !== "*") filters.role = roleFilter;

        if (Object.keys(filters).length > 0) {
            params.set("filters", JSON.stringify(filters));
        } else {
            params.delete("filters");
        }

        router.push(`?${params.toString()}`);
    }, [searchTerm, statusFilter, roleFilter]);

    const resetFilters = () => {
        setSearchTerm("");
        setStatusFilter("*");
        setRoleFilter("*");
    }


    const handleDeleteUser = async (userId: string) => {
        try {
            const res = await deleteUserAPI(userId);
            if (res.statusCode !== 200) return notify.error(res.message);
            notify.success(res.message)
        } catch (error) {

        }
    }

    const handleBanOrUnBanUser = async (userId: string, banUserAPI: boolean) => {
        try {
            const res = await banOrUnBanUserAPI(userId, banUserAPI);
            if (res.statusCode !== 200) return notify.error(res.message);
            notify.success(res.message)
        } catch (error) {

        }
    }

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
            key: "email",
            label: "Email",
            sortable: true,
            render: (value, row: IUser) => {
                const config = getRoleConfig(row.role.name)
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
            key: "isActivated",
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
            label: "Created At",
            render: (value) => (
                <div className="text-sm text-muted-foreground tabular-nums">
                    {dayjs(value).format("MMM DD, YYYY")}
                    <div className="text-xs text-muted-foreground/70 mt-0.5">{dayjs(value).format("HH:mm")}</div>
                </div>
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
            render: (value, row: IUser) => {
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => {
                                setIsUpdateModalOpen(true)
                                setEditingUser(row)
                            }
                            }
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 transition-all duration-200 rounded-lg group border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                            title="Edit user"
                        >
                            <Pencil className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span className="sr-only">Edit user</span>

                        </Button>

                        {
                            row.isBanned ?
                                <Button
                                    onClick={() => handleBanOrUnBanUser(row._id, false)}
                                    variant="ghost"
                                    size="sm"
                                    className="h-9 w-9 p-0 text-slate-500 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950/30 dark:hover:text-yellow-400 transition-all duration-200 rounded-lg group border border-transparent hover:border-yellow-200 dark:hover:border-yellow-800"
                                    title="Ban user"
                                >
                                    <LockKeyhole className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="sr-only">Ban user</span>
                                </Button>
                                :
                                <Button
                                    onClick={() => handleBanOrUnBanUser(row._id, true)}
                                    variant="ghost"
                                    size="sm"
                                    className="h-9 w-9 p-0 text-slate-500 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950/30 dark:hover:text-yellow-400 transition-all duration-200 rounded-lg group border border-transparent hover:border-yellow-200 dark:hover:border-yellow-800"
                                    title="UnBan user"
                                >
                                    <LockKeyholeOpen className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="sr-only">UnBan user</span>
                                </Button>
                        }
                        <DeleteButton id={row._id} onDelete={handleDeleteUser} />
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
                                User Management
                            </h1>
                            <p className="text-lg text-muted-foreground font-medium">
                                Manage user roles and permissions across your system
                            </p>
                        </div>
                        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create User
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

                                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                                            <SelectTrigger className="w-[140px] h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                <SelectItem value="*">All Status</SelectItem>
                                                <SelectItem value="active">Active Only</SelectItem>
                                                <SelectItem value="inactive">Inactive Only</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                                            <SelectTrigger className="w-[140px] h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                                <SelectValue placeholder="Role Type" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                <SelectItem value="*">All Roles</SelectItem>
                                                {listRole.length > 0 && listRole.map((item) => (
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
                                Users Overview ({meta.total} {meta.total === 1 ? "user" : "users"})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <TableCustomize data={data} meta={meta} columns={columns} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            <CreateUserModal onOpenChange={setIsCreateModalOpen} open={isCreateModalOpen} listRole={listRole} />
            {editingUser && (
                <UpdateUserModal
                    open={isUpdateModalOpen}
                    onOpenChange={setIsUpdateModalOpen}
                    user={editingUser}
                    listRole={listRole}
                />
            )}
        </div>
    )
}

export default UserTable;

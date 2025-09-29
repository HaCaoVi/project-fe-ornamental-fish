"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@components/ui/dialog"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Textarea } from "@components/ui/textarea"
import { Switch } from "@components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Plus, Save, X } from "lucide-react"
import ModulePermissions from "./module-permissions"
import { notify } from "@lib/helpers/notify"
// import { listPermissionAPI } from "@lib/api/permission"
import { IPermission, IRole } from "../../../../types/model"

interface RoleModalProps {
    isOpen?: boolean
    onOpenChange?: (open: boolean) => void
    role?: IRole | null
    onSubmit?: (role: Omit<IRole, "_id"> & { permissions: string[] }) => Promise<void>
    onReload?: () => void
}

// ✅ Zod schema
const roleSchema = z.object({
    name: z.string().min(1, "Role name is required"),
    description: z.string().min(1, "Description is required"),
    isActive: z.boolean().catch(true),
})

type RoleFormValues = z.infer<typeof roleSchema>

const RoleModal = ({ isOpen, onOpenChange, role, onSubmit, onReload }: RoleModalProps) => {
    const [open, setOpen] = useState(isOpen || false)
    const [loading, setLoading] = useState(false)
    const [selectedPermissions, setSelectedPermissions] = useState<Record<string, boolean>>({})
    const [listPermissions, setListPermissions] = useState<
        { module: string; permissions: IPermission[] }[] | null
    >(null)

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<RoleFormValues>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: "",
            description: "",
            isActive: true,
        },
    })

    // useEffect(() => {
    //     if (open) {
    //         (async () => {
    //             const res = await listPermissionAPI(1, 100)

    //             if (res.statusCode === 200 && res.data) {
    //                 const groupedPermissions = res.data.result.reduce((acc, permission) => {
    //                     const existingModule = acc.find((item) => item.module === permission.module)
    //                     if (existingModule) {
    //                         existingModule.permissions.push(permission)
    //                     } else {
    //                         acc.push({ module: permission.module, permissions: [permission] })
    //                     }
    //                     return acc
    //                 }, [] as { module: string; permissions: IPermission[] }[])

    //                 setListPermissions(groupedPermissions)
    //                 return;
    //             }
    //             setListPermissions([])
    //         })()
    //     }
    // }, [open])

    // Cập nhật form khi edit
    useEffect(() => {
        if (role) {
            reset({
                name: role.name,
                description: role.description,
                isActive: role.isActive,
            })

            const permissions: Record<string, boolean> = {}
            role.permissions?.forEach((permission: any) => {
                permissions[permission._id] = true
            })
            setSelectedPermissions(permissions)
        } else {
            reset({ name: "", description: "", isActive: true })
            setSelectedPermissions({})
        }
    }, [role, reset])

    const submitForm = async (data: RoleFormValues) => {
        if (!data.name.trim() || !data.description.trim()) {
            notify.error("Please fill in all required fields")
            return
        }

        setLoading(true)
        try {
            const checkedPermissions = Object.keys(selectedPermissions).filter(
                (key) => selectedPermissions[key] && key.match(/^[0-9a-fA-F]{24}$|^\d+$/),
            )
            console.log("checkedPermissions>>>> : ", checkedPermissions);

            await onSubmit?.({
                ...data,
                permissions: checkedPermissions,
            })

            handleClose()
            onReload?.()
        } catch (error) {
            console.error("An error occurred while saving the role")
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setOpen(false)
        onOpenChange?.(false)
        reset({ name: "", description: "", isActive: true })
        setSelectedPermissions({})
    }

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        onOpenChange?.(newOpen)
        if (!newOpen) handleClose()
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Role
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-4xl max-h-[90vh] overflow-y-auto scroll-custom">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        {role?._id ? "Update Role" : "Create New Role"}
                    </DialogTitle>
                    <DialogDescription>
                        {role?._id
                            ? "Update the role details and permissions"
                            : "Create a new role with specific permissions"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Role Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                {...register("name")}
                                placeholder="Enter role name"
                                className="border border-gray-200"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            <Label htmlFor="status">Active</Label>
                            <Controller
                                name="isActive"
                                control={control}
                                render={({ field }) => (
                                    <Switch
                                        id="status"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="h-6 w-13 border border-gray-200 data-[state=unchecked]:bg-gray-200"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            placeholder="Enter role description"
                            rows={3}
                            className="border border-gray-200"
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <Card className="border border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-lg">Permissions</CardTitle>
                            <CardDescription>
                                Select the permissions allowed for this role
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ModulePermissions
                                listPermissions={listPermissions}
                                selectedPermissions={selectedPermissions}
                                onPermissionChange={setSelectedPermissions}
                            />
                        </CardContent>
                    </Card>

                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            <Save className="h-4 w-4 mr-2" />
                            {loading ? "Saving..." : role?._id ? "Update Role" : "Create Role"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default RoleModal

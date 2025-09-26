"use client"

import { useState } from "react"
import { Card, CardContent } from "@components/ui/card"
import { Switch } from "@components/ui/switch"
import { Label } from "@components/ui/label"
import { Badge } from "@components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@components/lib/utils"

interface IPermission {
    _id: string
    name: string
    apiPath: string
    method: string
    module: string
}

interface ModulePermissionsProps {
    listPermissions:
    | {
        module: string
        permissions: IPermission[]
    }[]
    | null
    selectedPermissions: Record<string, boolean>
    onPermissionChange: (permissions: Record<string, boolean>) => void
}

const ModulePermissions = ({ listPermissions, selectedPermissions, onPermissionChange }: ModulePermissionsProps) => {
    const [openModules, setOpenModules] = useState<Record<string, boolean>>({})

    const getMethodColor = (method: string) => {
        switch (method.toUpperCase()) {
            case "GET":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "POST":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "PUT":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "PATCH":
                return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
            case "DELETE":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    const handleModuleToggle = (module: string, checked: boolean) => {
        const modulePermissions = listPermissions?.find((item) => item.module === module)
        if (!modulePermissions) return

        const newPermissions = { ...selectedPermissions }

        // Set module switch
        newPermissions[module] = checked

        // Set all permissions in the module
        modulePermissions.permissions.forEach((permission) => {
            newPermissions[permission._id] = checked
        })

        onPermissionChange(newPermissions)
    }

    const handlePermissionToggle = (permissionId: string, module: string, checked: boolean) => {
        const newPermissions = { ...selectedPermissions }
        newPermissions[permissionId] = checked

        // Check if all permissions in module are selected
        const modulePermissions = listPermissions?.find((item) => item.module === module)
        if (modulePermissions) {
            const allSelected = modulePermissions.permissions.every((permission) =>
                permission._id === permissionId ? checked : newPermissions[permission._id],
            )
            newPermissions[module] = allSelected
        }

        onPermissionChange(newPermissions)
    }

    const toggleModule = (module: string) => {
        setOpenModules((prev) => ({ ...prev, [module]: !prev[module] }))
    }

    if (!listPermissions) {
        return <div className="text-center text-muted-foreground py-8">Loading permissions...</div>
    }

    return (
        <TooltipProvider>
            <div className="space-y-4">
                {listPermissions.map((moduleItem, index) => {
                    const isOpen = openModules[moduleItem.module] ?? false
                    const isModuleSelected = selectedPermissions[moduleItem.module] ?? false

                    return (
                        <Card key={index} className="border border-gray-200">
                            <Collapsible open={isOpen} onOpenChange={() => toggleModule(moduleItem.module)} className="cursor-pointer">
                                <CollapsibleTrigger className="w-full" asChild>
                                    <div className="flex items-center justify-between px-4 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            {isOpen ? (
                                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                            )}
                                            <h3 className="font-semibold text-left">{moduleItem.module}</h3>
                                            <Badge variant="outline" className="text-xs">
                                                {moduleItem.permissions.length} permissions
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            <Label htmlFor={`module-${moduleItem.module}`} className="text-sm font-medium">
                                                Select All
                                            </Label>
                                            <Switch
                                                className="h-6 w-13 border border-gray-300  data-[state=unchecked]:bg-gray-200"
                                                id={`module-${moduleItem.module}`}
                                                checked={isModuleSelected}
                                                onCheckedChange={(checked) => handleModuleToggle(moduleItem.module, checked)}
                                            />
                                        </div>
                                    </div>
                                </CollapsibleTrigger>

                                <CollapsibleContent
                                    className={cn(
                                        "overflow-hidden transition-all duration-300",
                                        "data-[state=closed]:animate-collapsible-up",
                                        "data-[state=open]:animate-collapsible-down"
                                    )}>
                                    <div className="p-4">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                            {moduleItem.permissions.map((permission, permIndex) => (
                                                <Card key={permIndex} className="border border-border/50 py-3">
                                                    <CardContent className="px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center justify-center mt-1">
                                                                <Switch
                                                                    id={`permission-${permission._id}`}
                                                                    checked={selectedPermissions[permission._id] ?? false}
                                                                    onCheckedChange={(checked) =>
                                                                        handlePermissionToggle(permission._id, moduleItem.module, checked)
                                                                    }
                                                                    className="h-6 w-13 border border-gray-200  data-[state=unchecked]:bg-gray-200"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div className="cursor-help">
                                                                                <Label
                                                                                    htmlFor={`permission-${permission._id}`}
                                                                                    className="font-medium text-sm cursor-pointer block mb-2"
                                                                                >
                                                                                    {permission.name}
                                                                                </Label>
                                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                                    <Badge
                                                                                        variant="outline"
                                                                                        className={cn("text-xs font-mono", getMethodColor(permission.method))}
                                                                                    >
                                                                                        {permission.method}
                                                                                    </Badge>
                                                                                    <span className="text-xs text-muted-foreground font-mono truncate">
                                                                                        {permission.apiPath}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent side="top" className="max-w-xs">
                                                                            <div className="space-y-1">
                                                                                <p className="font-medium">{permission.name}</p>
                                                                                <p className="text-xs">
                                                                                    <span className="font-mono">{permission.method}</span> {permission.apiPath}
                                                                                </p>
                                                                            </div>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </Card>
                    )
                })}
            </div>
        </TooltipProvider>
    )
}

export default ModulePermissions

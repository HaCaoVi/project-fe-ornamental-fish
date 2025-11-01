"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Button } from "@components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog"
import { Input } from "@components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Calendar } from "@components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import { Switch } from "@components/ui/switch"
import { cn } from "@components/lib/utils"
import { notify } from "@lib/helpers/notify"
import { IRole, IUser } from "../../../../types/model"
import { updateUserAPI } from "@lib/api/user"

// Validation schema
const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    birthday: z.preprocess((val: any) => {
        const date = val instanceof Date ? val : new Date(val)
        return isNaN(date.getTime()) ? undefined : date
    },
        z.date().refine((date) => date < new Date(), {
            message: "Birthday must be a past date",
        })),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
        message: "Please select a gender",
    }),
    address: z.string().min(1, "Address is required"),
    role: z.string().min(1, "Please select a role"),
    isActivated: z.boolean(),
})

type UpdateUserFormData = z.infer<typeof createUserSchema>

interface UpdateUserModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    listRole: IRole[],
    user: IUser
}

export function UpdateUserModal({ open, onOpenChange, listRole, user }: UpdateUserModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<UpdateUserFormData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            gender: "MALE",
            address: "",
            role: "",
            isActivated: false,
            birthday: undefined
        },
    })

    useEffect(() => {
        if (open && user) {
            reset({
                name: user.name,
                gender: user.gender,
                address: user.address,
                role: user.role._id,
                isActivated: user.isActivated,
                birthday: new Date(user.birthday),
            })
        }
    }, [open, user, reset])

    const onSubmit = async (data: UpdateUserFormData) => {
        setIsSubmitting(true)
        try {
            const res = await updateUserAPI(user._id,
                data.name, data.birthday,
                data.gender, data.address, data.role, data.isActivated
            )
            if (res.statusCode !== 200) return notify.error(res.message)
            notify.success(res.message)
            reset()
            onOpenChange(false)
        } catch (error) {
            console.error("Error creating user:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        reset()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-bold text-3xl">Create New User</DialogTitle>
                    <DialogDescription>Fill in the information below to create a new user account.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="font-bold text-sm">Full Name</label>
                        <Input
                            className="border border-slate-200"
                            placeholder="Enter full name" {...register("name")} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email & Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-bold text-sm">Email</label>
                            <Input
                                className="border border-slate-200"
                                type="email" placeholder="Enter email" value={user.email}
                                disabled
                            />
                        </div>
                        <div>
                            <label className="font-bold text-sm">Password</label>
                            <Input
                                disabled
                                className="border border-slate-200"
                                type="password" placeholder="Enter password" value={"********"} />
                        </div>
                    </div>

                    {/* Birthday & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-bold text-sm">Birthday</label>
                            <Controller
                                control={control}
                                name="birthday"
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className={cn("w-full text-left", !field.value && "text-muted-foreground")}>
                                                {field.value ? format(field.value, "PPP") : "Select birthday"}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start" className="p-0 w-auto">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                            {errors.birthday && <p className="text-red-500 text-sm">{errors.birthday.message}</p>}
                        </div>

                        <div className="flex justify-around">
                            <div>
                                <label className="font-bold text-sm">Gender</label>
                                <Controller
                                    control={control}
                                    name="gender"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MALE">Male</SelectItem>
                                                <SelectItem value="FEMALE">Female</SelectItem>
                                                <SelectItem value="OTHER">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                            </div>


                            {/* Role */}
                            <div>
                                <label className="font-bold text-sm">Role</label>
                                <Controller
                                    control={control}
                                    name="role"
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {listRole.map(role => (
                                                    <SelectItem key={role._id} value={role._id}>{role.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                            </div>
                        </div>
                    </div>
                    {/* Address */}
                    <div>
                        <label className="font-bold text-sm">Address</label>
                        <Input
                            className="border border-slate-200"
                            placeholder="Enter address" {...register("address")} />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    {/* Is Activated */}
                    <div className="flex items-center space-x-2">
                        <label className="font-bold text-sm">Activate</label>
                        <Controller
                            name="isActivated"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    id="status"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="h-6 w-13 border border-slate-200 data-[state=unchecked]:bg-gray-200"
                                />
                            )}
                        />
                    </div>

                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update User
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

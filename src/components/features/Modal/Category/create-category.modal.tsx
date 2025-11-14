"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
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

import { notify } from "@lib/helpers/notify"
import { ICategories, ICategoryDetail } from "../../../../types/model"
import { createCategoryAPI, updateCategoryAPI } from "@lib/api/category"

// Validation schema
const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
})

type CategoryDetailFormData = z.infer<typeof createUserSchema>

interface CUCategoryDetailModelProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    categories: ICategories[],
    item?: ICategoryDetail | null
}

export function CUCategoryDetailModel({ open, onOpenChange, categories, item }: CUCategoryDetailModelProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<CategoryDetailFormData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            category: ""
        },
    })
    useEffect(() => {
        if (open) {
            if (item) {
                reset({
                    name: item.name,
                    category: item.category._id,
                })
            } else {
                reset({
                    name: "",
                    category: "",
                });
            }
        }
    }, [open, item, reset])

    const onSubmit = async (data: CategoryDetailFormData) => {
        setIsSubmitting(true)
        try {
            let res: any = null;
            if (!item) {
                res = await createCategoryAPI(data.name, data.category)
            } else {
                res = await updateCategoryAPI(item._id, data.name, data.category)
            }
            if (res.statusCode === 201 || res.statusCode === 200) {
                notify.success(res.message)
                reset()
                onOpenChange(false)
            } else {
                notify.warning(res.message)
            }
        } catch (error) {
            if (process.env.NODE_ENV === "development") {
                console.error(error);
            }
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
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-bold text-3xl">{item ? "Update Category Detail" : "Create New Category Detail"}</DialogTitle>
                    <DialogDescription>Fill in the information below to {item ? "update" : "create a new"} category detail.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="font-bold text-sm">Name<span className="text-red-500">*</span></label>
                        <Input
                            className="border border-slate-200"
                            placeholder="Enter full name" {...register("name")} />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    {/* Category */}
                    <div>
                        <label className="font-bold text-sm">Category<span className="text-red-500">*</span></label>
                        <Controller
                            control={control}
                            name="category"
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className={"w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"}>
                                        <SelectValue placeholder="Choose Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cate => (
                                            <SelectItem key={cate._id} value={cate._id}>{cate.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                    </div>
                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {item ? "Update" : "Create"} Category
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent >
        </Dialog >
    )
}

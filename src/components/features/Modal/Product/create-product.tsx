"use client"

import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog"
import { Input } from "@components/ui/input"
import { Switch } from "@components/ui/switch"
import { Label } from "@components/ui/label"
import { Button } from "@components/ui/button"
import { ICategories, ICategoryDetail, IProduct } from "../../../../types/model"
import { listCategoryDetailAPI } from "@lib/api/category"
import PriceInput from "@components/lib/PriceInput"
import dynamic from "next/dynamic";
const Tiptap = dynamic(() => import("@components/lib/Tiptap"), {
    ssr: false,
    loading: () => <Spinner />,
})
const FileUpload = dynamic(() => import("@components/lib/FileUpload"), {
    ssr: false,
    loading: () => <div className="h-24 bg-gray-100 animate-pulse rounded-lg" />,
})
import { createProductAPI, updateProductAPI } from "@lib/api/product"
import { notify } from "@lib/helpers/notify"
import { Spinner } from "@components/ui/spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"

// ✅ Define schema with Zod
const productSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        code: z.string().min(1, "Code is required"),
        description: z.string().min(1, "Description is required"),
        price: z.string().min(1, "Price is required"),
        discount: z.string().min(1, "Discount is required"),
        quantity: z.string().min(1, "Quantity is required"),
        mainImageUrl: z.string().min(1, "Main image required"),
        mainVideoUrl: z.string().optional(),
        isActivated: z.boolean(),
        categoryDetail: z.string().min(1, "Category detail is required"),
        color: z.string().min(1, "Color image required"),
        origin: z.string().min(1, "Origin image required"),
        height: z.string().min(1, "Height is required"),
        weight: z.string().min(1, "Weight is required"),
        length: z.string().min(1, "Length is required"),
        width: z.string().min(1, "Width is required"),
    })
    .superRefine((data, ctx) => {
        const price = Number(data.price)
        const discount = Number(data.discount)

        if (!isNaN(price) && !isNaN(discount)) {
            if (discount >= price) {
                ctx.addIssue({
                    code: "custom",
                    message: "Discount must be less than price",
                    path: ["discount"],
                })
            }
        }
    })

type ProductFormValues = z.infer<typeof productSchema>

interface ProductModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    categories: ICategories[]
    item: IProduct | null
}

export function ProductModal({ open, onOpenChange, categories, item }: ProductModalProps) {
    const [category, setCategory] = useState<string>("")
    const [listCategoryDetail, setListCategoryDetail] = useState<ICategoryDetail[]>([])
    const [cachedDetails, setCachedDetails] = useState<Record<string, ICategoryDetail[]>>({});

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            code: "",
            description: "",
            price: "",
            discount: "0",
            quantity: "",
            mainImageUrl: "",
            mainVideoUrl: "",
            isActivated: true,
            categoryDetail: "",
            color: "",
            origin: "",
            height: "",
            weight: "",
            length: "",
            width: "",
        },
    })
    const { control, handleSubmit, clearErrors, reset, formState: { isSubmitting } } = form

    useEffect(() => {
        if (open) {
            if (item) {
                setCategory(String(item.categoryDetail.category))
                reset({
                    name: item.name,
                    code: item.code,
                    description: item.description,
                    price: item.price + "",
                    discount: item.discount + "",
                    quantity: item.stock.quantity + "",
                    mainImageUrl: item.mainImageUrl,
                    mainVideoUrl: item.mainVideoUrl,
                    isActivated: item.isActivated,
                    categoryDetail: item.categoryDetail._id,
                    color: item.color + "",
                    origin: item.origin,
                    height: item.height + "",
                    length: item.length + "",
                    width: item.width + "",
                    weight: item.weight + "",
                })
            } else {
                reset({
                    name: "",
                    code: "",
                    description: "",
                    price: "",
                    discount: "0",
                    quantity: "",
                    mainImageUrl: "",
                    mainVideoUrl: "",
                    isActivated: true,
                    categoryDetail: "",
                    color: "",
                    origin: "",
                    height: "",
                    length: "",
                    width: "",
                    weight: "",
                });
            }
        }
    }, [open, item, reset])


    useEffect(() => {
        if (!category) return;
        if (cachedDetails[category]) {
            setListCategoryDetail(cachedDetails[category]);
            return;
        }
        (async () => {
            const res = await listCategoryDetailAPI(1, 100, { category: category });
            if (res.statusCode === 200 && res.data) {
                setListCategoryDetail(res.data.result);
                setCachedDetails(prev => ({ ...prev, [category]: res.data!.result }));
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    // Default first category tab
    useEffect(() => {
        if (categories.length > 0) setCategory(categories[0]._id)
    }, [categories])

    // Submit handler
    const onSubmit = async (data: ProductFormValues) => {
        try {
            const { price, discount, quantity, ...rest } = data;
            const payload = {
                ...rest,
                price: Number(price),
                discount: Number(discount),
                quantity: Number(quantity),
            };

            let res: any = null;
            if (!item) {
                res = await createProductAPI(payload)
            } else {
                const { categoryDetail, color, description, discount, height, isActivated, length, mainImageUrl, name, origin, price, quantity, weight, width, mainVideoUrl } = payload
                res = await updateProductAPI(item._id, { categoryDetail, color, description, discount, height, isActivated, length, mainImageUrl, name, origin, price, quantity, weight, width, mainVideoUrl })
            }
            if (res.statusCode === 201 || res.statusCode === 200) {
                notify.success(res.message)
                reset();
                onOpenChange(false)
            } else {
                notify.warning(res.message)
            }

        } catch (error) {
            if (process.env.NODE_ENV === "development") {
                console.error(error);
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-6xl max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                    <DialogDescription>
                        Fill in the product details below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
                    {/* Common Fields */}
                    <div className="space-y-4">
                        {/* Category-Specific Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="flex flex-col gap-2">
                                <Label className="font-semibold" htmlFor="categoryDetail">Category-Specific<span className="text-red-500">*</span></Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger className="w-full h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                        <SelectValue placeholder="Select detail" /></SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {categories.map((d: any) => (
                                            <SelectItem key={d._id} value={d._id}>{d.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Controller
                                name="categoryDetail"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="flex flex-col gap-2">
                                        <Label className="font-semibold" htmlFor="categoryDetail">Category Detail<span className="text-red-500">*</span></Label>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                                <SelectValue placeholder="Select detail" /></SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                {listCategoryDetail.map((d: any) => (
                                                    <SelectItem key={d._id} value={d._id}>{d.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                    </div>
                                )}
                            />
                        </div>

                        {/* Name + Code */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-2">
                                        <Label className="font-semibold" htmlFor="name">Product Name<span className="text-red-500">*</span></Label>
                                        <Input className="border border-slate-200" {...field} placeholder="Enter product name" />
                                        {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="code"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-2">
                                        <Label className="font-semibold" htmlFor="code">Product Code<span className="text-red-500">*</span></Label>
                                        <Input disabled={item ? true : false} className="border border-slate-200" {...field} placeholder="Enter product code" />
                                        {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                    </div>
                                )}
                            />
                        </div>
                        {/* Price, Discount, Quantity */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Controller
                                name="price"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-2">
                                        <Label className="font-semibold" htmlFor="price">Price (VND)<span className="text-red-500">*</span></Label>
                                        <PriceInput className="border border-slate-200" {...field} placeholder="Enter price" />
                                        {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="discount"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-2">
                                        <Label className="font-semibold" htmlFor="discount">Discount (VND)<span className="text-red-500">*</span></Label>
                                        <PriceInput className="border border-slate-200"  {...field} placeholder="Enter discount" />
                                        {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="quantity"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-2">
                                        <Label className="font-semibold" htmlFor="quantity">Quantity<span className="text-red-500">*</span></Label>
                                        <PriceInput className="border border-slate-200" {...field} placeholder="Enter stock quantity" />
                                        {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                    </div>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                            <Controller name="origin" control={control} render={({ field, fieldState }) => (
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold" htmlFor="origin">Origin<span className="text-red-500">*</span></Label>
                                    <Input className="border border-slate-200" onChange={field.onChange} value={field.value ?? ""} placeholder="Enter origin" />
                                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                </div>
                            )} />
                            <Controller name="color" control={control} render={({ field, fieldState }) => (
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold" htmlFor="color">Color<span className="text-red-500">*</span></Label>
                                    <Input className="border border-slate-200" onChange={field.onChange} value={field.value ?? ""} placeholder="Enter color" />
                                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                </div>
                            )} />
                            <Controller name="height" control={control} render={({ field, fieldState }) => (
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold" htmlFor="size">Height (cm)<span className="text-red-500">*</span></Label>
                                    <PriceInput className="border border-slate-200"  {...field} placeholder="Enter height" />
                                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                </div>
                            )} />
                            <Controller name="length" control={control} render={({ field, fieldState }) => (
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold" htmlFor="size">Length (cm)<span className="text-red-500">*</span></Label>
                                    <PriceInput className="border border-slate-200"  {...field} placeholder="Enter length" />
                                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                </div>
                            )} />
                            <Controller name="width" control={control} render={({ field, fieldState }) => (
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold" htmlFor="size">Width (cm)<span className="text-red-500">*</span></Label>
                                    <PriceInput className="border border-slate-200"  {...field} placeholder="Enter width" />
                                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                </div>
                            )} />
                            <Controller name="weight" control={control} render={({ field, fieldState }) => (
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold" htmlFor="size">Weight (g)<span className="text-red-500">*</span></Label>
                                    <PriceInput className="border border-slate-200"  {...field} placeholder="Enter weight" />
                                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                </div>
                            )} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <Controller
                                name="mainImageUrl"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-2">
                                        <Label className="font-semibold">Main Image<span className="text-red-500">*</span></Label>
                                        <FileUpload onChange={field.onChange} value={field.value} isImage />
                                        {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="mainVideoUrl"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label className="font-semibold">Main Video</Label>
                                        <FileUpload onChange={field.onChange} value={field.value ?? ""} isVideo />
                                    </div>
                                )}
                            />
                            <Controller
                                name="isActivated"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-2">
                                        <Label className="font-semibold">Product Status</Label>
                                        <div className="flex items-center gap-3">
                                            <Switch
                                                id="status"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="h-6 w-13 border border-slate-200 data-[state=unchecked]:bg-gray-200"
                                            />
                                            <span>{field.value ? "Activated" : "Inactive"}</span>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    {/* Description */}
                    <Controller
                        name="description"
                        control={control}
                        render={({ field, fieldState }) => (
                            <div className="space-y-2">
                                <Label className="font-semibold" htmlFor="description">Description<span className="text-red-500">*</span></Label>
                                <Tiptap className="border border-slate-200" onChange={field.onChange} content={field.value} placeholder="Enter description..." />
                                {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                            </div>
                        )}
                    />
                    <DialogFooter>
                        <Button variant="outline" type="reset" onClick={() => {
                            clearErrors();
                            onOpenChange(false);
                        }}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Spinner color="white" />}
                            {item ? "Update" : "Create"} Product
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}

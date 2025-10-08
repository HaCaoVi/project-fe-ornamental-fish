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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { Input } from "@components/ui/input"
import { Switch } from "@components/ui/switch"
import { Label } from "@components/ui/label"
import { Button } from "@components/ui/button"
import { ICategories, ICategoryDetail, IProduct } from "../../../../types/model"
import { listCategoryDetailAPI } from "@lib/api/category"
import { CATE_FISH, CATE_FOOD, CATE_ACCESSORY } from "@lib/constants/constant"
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
import { createFishAPI } from "@lib/api/product"
import { notify } from "@lib/helpers/notify"
import { IBackendRes } from "../../../../types/backend"
import { Spinner } from "@components/ui/spinner"
import { AccessoryField, CategoryDetailSelect, FishField, FoodField } from "./field"

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

        // Optional fields (depending on tab)
        color: z.string().optional(),
        origin: z.string().optional(),
        size: z.string().optional(),
        expirationDate: z.string().optional(),
        weight: z.string().optional(),
        material: z.string().optional(),
        dimensions: z.string().optional(),
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
    const [activeTab, setActiveTab] = useState<string>("")
    const [listCategoryDetail, setListCategoryDetail] = useState<ICategoryDetail[]>([])

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
        },
    })

    const { control, handleSubmit, setError, clearErrors, reset, formState: { isSubmitting } } = form
    const [cachedDetails, setCachedDetails] = useState<Record<string, ICategoryDetail[]>>({});

    useEffect(() => {
        if (!activeTab) return;
        if (cachedDetails[activeTab]) {
            setListCategoryDetail(cachedDetails[activeTab]);
            return;
        }
        (async () => {
            const res = await listCategoryDetailAPI(1, 100, { category: activeTab });
            if (res.statusCode === 200 && res.data) {
                setListCategoryDetail(res.data.result);
                setCachedDetails(prev => ({ ...prev, [activeTab]: res.data!.result }));
            }
        })();
    }, [activeTab]);

    // Default first category tab
    useEffect(() => {
        if (categories.length > 0) setActiveTab(categories[0]._id)
    }, [categories])

    // Submit handler
    const onSubmit = async (data: ProductFormValues) => {
        try {
            const { color, origin, size, dimensions, expirationDate, material, weight, ...rest } = data;
            let res: IBackendRes<any> = {
                message: "",
                statusCode: 0,
            }
            let hasError = false;
            if (activeTab === CATE_FISH) {
                if (!color || !color.trim()) {
                    setError("color", { type: "manual", message: "Color is required" });
                    hasError = true;
                }
                if (!origin || !origin.trim()) {
                    setError("origin", { type: "manual", message: "Origin is required" });
                    hasError = true;
                }
                if (!size || !size.trim()) {
                    setError("size", { type: "manual", message: "Size is required" });
                    hasError = true;
                }

                if (hasError) {
                    return;
                }
                const { price, discount, quantity } = rest;
                const payload = {
                    ...rest,
                    price: Number(price),
                    discount: Number(discount),
                    quantity: Number(quantity),
                };
                res = await createFishAPI(color!, origin!, size!, payload);
            } else if (activeTab === CATE_FOOD) {

            } else {

            }
            if (res.statusCode === 201) {
                clearErrors();
                reset();
                notify.success(res.message)
                onOpenChange(false)
            } else {
                notify.warning(res.message)
            }
        } catch (error) {
            console.error("Create product error: ", error);
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
                                        <Input className="border border-slate-200" {...field} placeholder="Enter product code" />
                                        {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                    </div>
                                )}
                            />
                        </div>

                        {/* Description */}
                        <Controller
                            name="description"
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className="space-y-2">
                                    <Label className="font-semibold" htmlFor="description">Description<span className="text-red-500">*</span></Label>
                                    <Tiptap className="border border-slate-200" {...field} placeholder="Enter description..." />
                                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                                </div>
                            )}
                        />

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

                    {/* Category-Specific Fields */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold">Category-Specific</h3>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-3">
                                {categories.map((c) => (
                                    <TabsTrigger key={c._id} value={c._id}>{c.name}</TabsTrigger>
                                ))}
                            </TabsList>
                            {/* Fish */}
                            <TabsContent key="fish" value={CATE_FISH} asChild>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                    <CategoryDetailSelect control={control} listCategoryDetail={listCategoryDetail} />
                                    <FishField control={control} />
                                </div>
                            </TabsContent>

                            {/* Food */}
                            <TabsContent key="food" value={CATE_FOOD} asChild>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <CategoryDetailSelect control={control} listCategoryDetail={listCategoryDetail} />
                                    <FoodField control={control} />
                                </div>
                            </TabsContent>

                            {/* Accessory */}
                            <TabsContent key="accessory" value={CATE_ACCESSORY} asChild>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <CategoryDetailSelect control={control} listCategoryDetail={listCategoryDetail} />
                                    <AccessoryField control={control} />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

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
        </Dialog>
    )
}

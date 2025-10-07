"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
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
import { Textarea } from "@components/ui/textarea"
import { Switch } from "@components/ui/switch"
import { Label } from "@components/ui/label"
import { Button } from "@components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { ICategories, ICategoryDetail, IProduct } from "../../../../types/model"
import { listCategoryDetailAPI } from "@lib/api/category"
import { CATE_FISH, CATE_FOOD, CATE_ACCESSORY } from "@lib/constants/constant"
import PriceInput from "@components/lib/PriceInput"
import FileUpload from "@components/lib/FileUpload"
import Tiptap from "@components/lib/Tiptap"

// ✅ Define schema with Zod
const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    code: z.string().min(1, "Code is required"),
    description: z.string().min(1, "Description is required"),
    price: z.string().min(1, "Price is required"),
    discount: z.string().optional(),
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

type ProductFormValues = z.infer<typeof productSchema>

interface ProductModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    categories: ICategories[]
    item: IProduct | null
}

export function ProductModal({ open, onOpenChange, categories }: ProductModalProps) {
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
            isActivated: false,
            categoryDetail: "",
        },
    })

    const { control, handleSubmit, setValue, watch } = form
    const watchCategoryDetail = watch("categoryDetail")

    // Load category detail by tab
    useEffect(() => {
        if (activeTab) {
            (async () => {
                const res = await listCategoryDetailAPI(1, 100, { category: activeTab })
                if (res.statusCode === 200 && res.data) {
                    setListCategoryDetail(res.data.result)
                    if (res.data.result.length > 0) {
                        setValue("categoryDetail", res.data.result[0]._id)
                    }
                } else {
                    setListCategoryDetail([])
                }
            })()
        }
    }, [activeTab])

    // Default first category tab
    useEffect(() => {
        if (categories.length > 0) setActiveTab(categories[0]._id)
    }, [categories])

    // Submit handler
    const onSubmit = (data: ProductFormValues) => {
        console.log("✅ Product Data:", { ...data, category: activeTab })
    }

    const CategoryDetailSelect = () => {
        return (
            <Controller
                name="categoryDetail"
                control={control}
                render={({ field }) => (
                    <div className="flex flex-col gap-2">
                        <Label className="font-semibold" htmlFor="categoryDetail">Category Detail<span className="text-red-500">*</span></Label>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                <SelectValue placeholder="Select detail" /></SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {listCategoryDetail.map(d => (
                                    <SelectItem key={d._id} value={d._id}>{d.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            />
        )
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
                                        <Label className="font-semibold" htmlFor="discount">Discount (VND)</Label>
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

                            <AnimatePresence>
                                {/* Fish */}
                                <TabsContent key="fish" value={CATE_FISH} asChild>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                            <CategoryDetailSelect />
                                            <Controller name="color" control={control} render={({ field }) => (
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-semibold" htmlFor="color">Color<span className="text-red-500">*</span></Label>
                                                    <Input className="border border-slate-200" {...field} placeholder="Enter color" />
                                                </div>
                                            )} />
                                            <Controller name="origin" control={control} render={({ field }) => (
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-semibold" htmlFor="origin">Origin<span className="text-red-500">*</span></Label>
                                                    <Input className="border border-slate-200" {...field} placeholder="Enter origin" />
                                                </div>
                                            )} />
                                            <Controller name="size" control={control} render={({ field }) => (
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-semibold" htmlFor="size">Size<span className="text-red-500">*</span></Label>
                                                    <Input className="border border-slate-200" {...field} placeholder="Enter size" />
                                                </div>
                                            )} />
                                        </div>
                                    </motion.div>
                                </TabsContent>

                                {/* Food */}
                                <TabsContent key="food" value={CATE_FOOD} asChild>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                            <CategoryDetailSelect />
                                            <Controller name="weight" control={control} render={({ field }) => (
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-semibold" htmlFor="weight">Weight<span className="text-red-500">*</span></Label>
                                                    <Input className="border border-slate-200" {...field} placeholder="Weight" />
                                                </div>
                                            )} />
                                            <Controller name="expirationDate" control={control} render={({ field }) => (
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-semibold" htmlFor="weight">Expiration Date<span className="text-red-500">*</span></Label>
                                                    <Input className="border border-slate-200" {...field} placeholder="Expiration Date" />
                                                </div>
                                            )} />
                                        </div>
                                    </motion.div>
                                </TabsContent>

                                {/* Accessory */}
                                <TabsContent key="accessory" value={CATE_ACCESSORY} asChild>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <CategoryDetailSelect />
                                            <Controller name="material" control={control} render={({ field }) => (
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-semibold" htmlFor="material">Material<span className="text-red-500">*</span></Label>
                                                    <Input className="border border-slate-200" {...field} placeholder="Material" />
                                                </div>
                                            )} />
                                            <Controller name="dimensions" control={control} render={({ field }) => (
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-semibold" htmlFor="dimensions">Dimensions<span className="text-red-500">*</span></Label>
                                                    <Input className="border border-slate-200" {...field} placeholder="Dimensions" />
                                                </div>
                                            )} />
                                        </div>
                                    </motion.div>
                                </TabsContent>
                            </AnimatePresence>
                        </Tabs>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit">Save Product</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

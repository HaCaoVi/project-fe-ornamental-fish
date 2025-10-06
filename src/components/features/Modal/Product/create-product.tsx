"use client"

import { useEffect, useState } from "react"
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
import { ICategories, ICategoryDetail, IProduct } from "../../../../types/model"
import { CATE_ACCESSORY, CATE_FISH, CATE_FOOD } from "@lib/constants/constant"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { listCategoryDetailAPI } from "@lib/api/category"
import PriceInput from "@components/lib/PriceInput"
import FileUpload from "@components/lib/FileUpload"

interface ProductModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void,
    categories: ICategories[],
    item: IProduct | null
}

const categoryFieldsMap: Record<string, string[]> = {
    CATE_FISH: ["color", "origin", "size"],
    CATE_FOOD: ["foodType", "weight"],
    CATE_ACCESSORY: ["material", "dimensions"],
};

export function ProductModal({ open, onOpenChange, categories, item }: ProductModalProps) {
    const [activeTab, setActiveTab] = useState("")
    const [listCategoryDetail, setListCategoryDetail] = useState<ICategoryDetail[]>([])
    // Common fields
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [discount, setDiscount] = useState("0")
    const [quantity, setQuantity] = useState("")
    const [mainImageUrl, setMainImageUrl] = useState("")
    const [mainVideoUrl, setMainVideoUrl] = useState("")
    const [isActivated, setIsActivated] = useState(false)
    const [categoryDetail, setCategoryDetail] = useState("")
    // Ornamental Fish specific fields
    const [color, setColor] = useState("")
    const [origin, setOrigin] = useState("")
    const [size, setSize] = useState("")

    // Aquarium Fish Food specific fields (placeholder)
    const [foodType, setFoodType] = useState("")
    const [weight, setWeight] = useState("")

    // Accessory specific fields (placeholder)
    const [material, setMaterial] = useState("")
    const [dimensions, setDimensions] = useState("")

    useEffect(() => {
        if (activeTab && activeTab.length > 0) {
            (async () => {
                const res = await listCategoryDetailAPI(1, 100, { category: activeTab })
                if (res.statusCode === 200 && res.data) {
                    setListCategoryDetail(res.data.result)
                } else {
                    setListCategoryDetail([])
                }
            })()
        }
    }, [activeTab]);

    useEffect(() => {
        if (listCategoryDetail && listCategoryDetail.length > 0) {
            setCategoryDetail(listCategoryDetail[0]._id)
        }
    }, [listCategoryDetail])

    useEffect(() => {
        if (categories && categories.length > 0) {
            setActiveTab(categories[0]._id);
        }
    }, [categories]);

    const handleSave = () => {
        const commonData = {
            name,
            code,
            description,
            price: Number(price),
            discount: Number(discount),
            quantity: Number(quantity),
            mainImageUrl,
            mainVideoUrl,
            categoryDetail: activeTab,
            isActivated,
        }

        const categoryName = categories.find(c => c._id === activeTab)?.name;

        let specificData: any = {};
        if (categoryName && categoryFieldsMap[categoryName]) {
            categoryFieldsMap[categoryName].forEach(field => {
                specificData[field] = ({ color, origin, size, foodType, weight, material, dimensions } as any)[field];
            });
        }

        const productData = { ...commonData, ...specificData }
        console.log("Product Data:", productData)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                    <DialogDescription>
                        Fill in the product details below. Select the appropriate category tab for specific fields.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Common Fields */}
                    <div className="space-y-4">
                        <h3 className="text-md font-semibold text-foreground/80">General Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="font-bold" htmlFor="name">Product Name <span className="text-red-500">*</span></Label>
                                <Input
                                    className="border-slate-200 border"
                                    id="name"
                                    placeholder="Enter product name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold" htmlFor="code">Product Code<span className="text-red-500">*</span></Label>
                                <Input
                                    className="border-slate-200 border" id="code" placeholder="Enter product code" value={code} onChange={(e) => setCode(e.target.value)} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold" htmlFor="description">Description<span className="text-red-500">*</span></Label>
                            <Textarea
                                className="border-slate-200 border"
                                id="description"
                                placeholder="Enter product description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="font-bold" htmlFor="price">Price (VND)<span className="text-red-500">*</span></Label>
                                <PriceInput
                                    className="border-slate-200 border"
                                    id="discount"
                                    type="number"
                                    placeholder="Enter price"
                                    onChange={setPrice} value={price} />
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold" htmlFor="discount">Discount (VND)<span className="text-red-500">*</span></Label>
                                <PriceInput
                                    className="border-slate-200 border"
                                    id="discount"
                                    type="number"
                                    placeholder="Enter discount"
                                    value={discount}
                                    onChange={setDiscount}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold" htmlFor="quantity">Quantity<span className="text-red-500">*</span></Label>
                                <Input
                                    className="border-slate-200 border"
                                    id="quantity"
                                    type="number"
                                    placeholder="Enter stock quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start">
                            {/* Image upload */}
                            <div className="flex flex-col items-start space-y-2">
                                <Label className="font-bold" htmlFor="mainImageUrl">
                                    Main Image URL<span className="text-red-500">*</span>
                                </Label>
                                <FileUpload
                                    onChange={setMainImageUrl}
                                    value={mainImageUrl}
                                    isImage
                                />
                            </div>

                            {/* Video upload */}
                            <div className="flex flex-col items-start space-y-2">
                                <Label className="font-bold" htmlFor="mainVideoUrl">
                                    Main Video URL
                                </Label>
                                <FileUpload
                                    onChange={setMainVideoUrl}
                                    value={mainVideoUrl}
                                    isVideo
                                />
                            </div>

                            {/* Switch */}
                            <div className="flex flex-col items-start space-y-2">
                                <Label className="font-bold" htmlFor="isActivated">
                                    Product Status
                                </Label>
                                <div className="flex items-center space-x-3">
                                    <Switch
                                        id="status"
                                        checked={isActivated}
                                        onCheckedChange={setIsActivated}
                                        className="h-6 w-12 border border-gray-300 data-[state=unchecked]:bg-gray-200"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {isActivated ? "Activated" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category-Specific Fields with Tabs */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold">Category-Specific</h3>

                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-3">
                                {categories && categories.length > 0 && categories.map((category) => (
                                    <TabsTrigger key={category._id} value={category._id}>
                                        {category.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <AnimatePresence>
                                {/* Ornamental Fish Tab */}
                                <TabsContent key="ornamental-fish" value={CATE_FISH} asChild>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4 mt-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold" htmlFor="categoryDetail">Category Detail<span className="text-red-500">*</span></Label>
                                                <Select value={categoryDetail} onValueChange={setCategoryDetail} >
                                                    <SelectTrigger className="w-full h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                                        <SelectValue placeholder="Select category detail" />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-xl">
                                                        {listCategoryDetail?.map(c => (
                                                            <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold" htmlFor="color">Color<span className="text-red-500">*</span></Label>
                                                <Input

                                                    id="color"
                                                    placeholder="Enter color"
                                                    value={color}
                                                    onChange={(e) => setColor(e.target.value)}
                                                    className="flex-1 border-slate-200 border"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold" htmlFor="origin">Origin<span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="origin"
                                                    placeholder="Enter origin"
                                                    value={origin}
                                                    onChange={(e) => setOrigin(e.target.value)}
                                                    className="flex-1 border-slate-200 border"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold" htmlFor="size">Size<span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="size"
                                                    placeholder="Enter size"
                                                    value={size}
                                                    onChange={(e) => setSize(e.target.value)}
                                                    className="flex-1 border-slate-200 border"
                                                />
                                            </div>
                                        </div>

                                    </motion.div>
                                </TabsContent>

                                {/* Aquarium Fish Food Tab */}
                                <TabsContent key="fish-food" value={CATE_FOOD} asChild>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4 mt-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold" htmlFor="categoryDetail">Category Detail<span className="text-red-500">*</span></Label>
                                                <Select value={categoryDetail} onValueChange={setCategoryDetail} >
                                                    <SelectTrigger className="w-full h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                                        <SelectValue placeholder="Select category detail" />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-xl">
                                                        {listCategoryDetail?.map(c => (
                                                            <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold" htmlFor="weight">Weight<span className="text-red-500">*</span></Label>
                                                <Input
                                                    className="border-slate-200 border"
                                                    id="weight"
                                                    placeholder="Enter weight"
                                                    value={weight}
                                                    onChange={(e) => setWeight(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold" htmlFor="foodType">Expiration Date<span className="text-red-500">*</span></Label>
                                                <Input
                                                    className="border-slate-200 border"
                                                    id="foodType"
                                                    placeholder="Expiration date"
                                                    value={foodType}
                                                    onChange={(e) => setFoodType(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold" htmlFor="size">Storage Instructions<span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="storageInstructions"
                                                    placeholder="Enter storage instructions"
                                                    value={size}
                                                    onChange={(e) => setSize(e.target.value)}
                                                    className="flex-1 border-slate-200 border"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                </TabsContent>

                                {/* Accessory Tab */}
                                <TabsContent key="accessory" value={CATE_ACCESSORY} asChild>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4 mt-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="font-bold" htmlFor="material">Material<span className="text-red-500">*</span></Label>
                                                <Input
                                                    className="border-slate-200 border"
                                                    id="material"
                                                    placeholder="Plastic, Glass, Metal, etc."
                                                    value={material}
                                                    onChange={(e) => setMaterial(e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="font-bold" htmlFor="dimensions">Dimensions<span className="text-red-500">*</span></Label>
                                                <Input
                                                    className="border-slate-200 border"
                                                    id="dimensions"
                                                    placeholder="10x20x30 cm"
                                                    value={dimensions}
                                                    onChange={(e) => setDimensions(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                </TabsContent>
                            </AnimatePresence>
                        </Tabs>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Product</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

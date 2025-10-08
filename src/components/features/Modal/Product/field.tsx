import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import React from "react"
import { Controller } from "react-hook-form"

export const CategoryDetailSelect = React.memo(({ control, listCategoryDetail }: any) => {
    return (
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
    )
})

export const FishField = React.memo(({ control }: any) => {
    return (
        <>
            <Controller name="color" control={control} render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                    <Label className="font-semibold" htmlFor="color">Color<span className="text-red-500">*</span></Label>
                    <Input className="border border-slate-200" onChange={field.onChange} value={field.value ?? ""} placeholder="Enter color" />
                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                </div>
            )} />
            <Controller name="origin" control={control} render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                    <Label className="font-semibold" htmlFor="origin">Origin<span className="text-red-500">*</span></Label>
                    <Input className="border border-slate-200" onChange={field.onChange} value={field.value ?? ""} placeholder="Enter origin" />
                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                </div>
            )} />
            <Controller name="size" control={control} render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                    <Label className="font-semibold" htmlFor="size">Size<span className="text-red-500">*</span></Label>
                    <Input className="border border-slate-200" onChange={field.onChange} value={field.value ?? ""} placeholder="Enter size" />
                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                </div>
            )} />
        </>
    )
})

export const FoodField = React.memo(({ control }: any) => {
    return (
        <>
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
        </>
    )
})

export const AccessoryField = React.memo(({ control }: any) => {
    return (
        <>
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
        </>
    )
})

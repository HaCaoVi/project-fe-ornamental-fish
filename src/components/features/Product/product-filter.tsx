"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Label } from "@components/ui/label"
import { Checkbox } from "@components/ui/checkbox"
import { Slider } from "@components/ui/slider"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Search, TicketCheck } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppContext } from "@hooks/app.hook"
import { ICategoryDetail } from "../../../types/model"
import { Switch } from "@components/ui/switch"

export function ProductFilters({ categoryId }: any) {
    const { categories } = useAppContext()
    const router = useRouter();
    const searchParams = useSearchParams();
    const [priceRange, setPriceRange] = useState([0, 5000000])
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryDetailFilter, setCategoryFilter] = useState<string[]>([]);
    const [types, setTypes] = useState<ICategoryDetail[]>([]);
    const [isSale, setIsSale] = useState<boolean>(false);


    useEffect(() => {
        if (categories && categories.length > 0) {
            const filterType = categories.find(x => x._id === categoryId);
            if (filterType) {
                setTypes(filterType?.details);
            } else {
                setTypes([]);
            }
        }
    }, [categories, categoryId])

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setCategoryFilter((prev: string[]) => {
            if (checked) {
                return [...prev, id];
            } else {
                return prev.filter((item) => item !== id);
            }
        });
    };

    const handleApplyFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        let filters: any = {};
        if (searchTerm) params.set('search', searchTerm);
        else params.delete('search');

        if (priceRange && priceRange.length === 2) {
            filters.price = priceRange;
        }
        if (categoryDetailFilter && categoryDetailFilter.length > 0) {
            filters.categoryDetail = categoryDetailFilter;
        }

        filters.sale = isSale;

        params.set("filters", JSON.stringify(filters));
        const newUrl = `?${params.toString()}`;
        const currentUrl = `?${searchParams.toString()}`;
        if (newUrl !== currentUrl) {
            router.replace(newUrl);
        }
    }
    return (
        <Card className="sticky py-5 top-20 backdrop-blur-sm bg-card/80 border-border/50">
            <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Search Bar */}
                <div className="space-y-3">
                    <div className="relative flex-1 max-w-md w-full sm:w-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <Input
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 h-10 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Label className="font-semibold"><TicketCheck className="text-slate-400" />Sale</Label>

                    <Switch
                        id="status"
                        checked={isSale}
                        onCheckedChange={setIsSale}
                        className="h-6 w-13 border border-slate-200 data-[state=unchecked]:bg-gray-200"
                    />
                </div>
                {/* Fish Type Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold">Type</Label>
                    <div className="space-y-2">
                        {types && types.length > 0 && (
                            <div className="grid grid-cols-2 gap-2">
                                {types.map((type) => (
                                    <div key={type._id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={type._id}
                                            checked={categoryDetailFilter.includes(type._id)}
                                            onCheckedChange={(checked) => handleCheckboxChange(type._id, !!checked)}
                                        />
                                        <label
                                            htmlFor={type._id}
                                            className="text-sm font-medium leading-none cursor-pointer"
                                        >
                                            {type.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold">Price Range</Label>
                    <div className="pt-2">
                        <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            max={500000}
                            step={10000}
                            className="mb-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{priceRange[0].toLocaleString("en-US")}đ</span>
                            <span>{priceRange[1].toLocaleString("en-US")}đ</span>
                        </div>
                    </div>
                </div>

                {/* Apply Button */}
                <Button onClick={handleApplyFilter} className="w-full">Apply Filters</Button>
            </CardContent>
        </Card>
    )
}

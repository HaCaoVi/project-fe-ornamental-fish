"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Label } from "@components/ui/label"
import { Checkbox } from "@components/ui/checkbox"
import { Slider } from "@components/ui/slider"
import { Switch } from "@components/ui/switch"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Search } from "lucide-react"

const fishTypes = [
    { id: "betta", label: "Betta Fish" },
    { id: "guppy", label: "Guppy" },
    { id: "koi", label: "Koi Fish" },
    { id: "goldfish", label: "Goldfish" },
    { id: "tetra", label: "Tetra Fish" },
]

export function ProductFilters() {
    const [priceRange, setPriceRange] = useState([0, 5000000])
    const [inStockOnly, setInStockOnly] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

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

                {/* Fish Type Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold">Fish Type</Label>
                    <div className="space-y-2">
                        {fishTypes.map((type) => (
                            <div key={type.id} className="flex items-center space-x-2">
                                <Checkbox id={type.id} />
                                <label
                                    htmlFor={type.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    {type.label}
                                </label>
                            </div>
                        ))}
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

                {/* Availability Toggle */}
                <div className="flex items-center justify-between space-x-2 pt-2">
                    <Label htmlFor="in-stock" className="text-sm font-semibold cursor-pointer">
                        In Stock Only
                    </Label>
                    <Switch
                        id="status"
                        checked={inStockOnly}
                        onCheckedChange={setInStockOnly}
                        className="h-6 w-13 border border-slate-200 data-[state=unchecked]:bg-gray-200"
                    />
                </div>

                {/* Apply Button */}
                <Button className="w-full">Apply Filters</Button>
            </CardContent>
        </Card>
    )
}

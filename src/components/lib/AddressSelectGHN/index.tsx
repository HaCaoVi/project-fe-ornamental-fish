"use client"

import { useEffect, useState } from "react"
import { Label } from "@components/ui/label"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import { Button } from "@components/ui/button"
import { listProvince, listDistrict, listWard } from "@lib/api/ghn"

const AddressCustomize = (field: any) => {
    const [openProvince, setOpenProvince] = useState(false)
    const [openDistrict, setOpenDistrict] = useState(false)
    const [openWard, setOpenWard] = useState(false)

    const [provinces, setProvinces] = useState<any[]>([])
    const [districts, setDistricts] = useState<any[]>([])
    const [wards, setWards] = useState<any[]>([])

    const [selectedProvince, setSelectedProvince] = useState<any>(null)
    const [selectedDistrict, setSelectedDistrict] = useState<any>(null)
    const [selectedWard, setSelectedWard] = useState<any>(null)

    useEffect(() => {
        ; (async () => {
            const res = await listProvince()
            if (res.statusCode === 200 && res.data) setProvinces(res.data)
        })()
    }, [])

    useEffect(() => {
        const value = field?.value
        if (!value || provinces.length === 0) return

        const [provinceId, districtId, wardCode] = value.split("-")

        const foundProvince = provinces.find((p) => p.ProvinceID == provinceId)
        if (foundProvince) {
            setSelectedProvince(foundProvince)
                ; (async () => {
                    const resD = await listDistrict(foundProvince.ProvinceID)
                    if (resD.statusCode === 200 && resD.data) {
                        setDistricts(resD.data)
                        const foundDistrict = resD.data.find((d) => d.DistrictID == districtId)
                        if (foundDistrict) {
                            setSelectedDistrict(foundDistrict)
                            const resW = await listWard(foundDistrict.DistrictID)
                            if (resW.statusCode === 200 && resW.data) {
                                setWards(resW.data)
                                const foundWard = resW.data.find((w) => w.WardCode == wardCode)
                                if (foundWard) setSelectedWard(foundWard)
                            }
                        }
                    }
                })()
        }
    }, [field?.value, provinces])

    useEffect(() => {
        if (selectedProvince) {
            ; (async () => {
                const res = await listDistrict(selectedProvince.ProvinceID)
                if (res.statusCode === 200 && res.data) setDistricts(res.data)
            })()
        } else {
            setDistricts([])
        }
    }, [selectedProvince])

    useEffect(() => {
        if (selectedDistrict) {
            ; (async () => {
                const res = await listWard(selectedDistrict.DistrictID)
                if (res.statusCode === 200 && res.data) setWards(res.data)
            })()
        } else {
            setWards([])
        }
    }, [selectedDistrict])

    useEffect(() => {
        if (selectedProvince && selectedDistrict && selectedWard) {
            field?.onChange(
                `${selectedProvince.ProvinceID}-${selectedDistrict.DistrictID}-${selectedWard.WardCode}`
            )
        }
    }, [selectedProvince, selectedDistrict, selectedWard])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Province */}
                <Popover open={openProvince} onOpenChange={setOpenProvince}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {selectedProvince ? selectedProvince.ProvinceName : "Select province"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                        <Command>
                            <CommandInput placeholder="Search province..." />
                            <CommandList>
                                <CommandEmpty>Not found</CommandEmpty>
                                <CommandGroup>
                                    {provinces.map((p) => (
                                        <CommandItem
                                            key={p.ProvinceID}
                                            onSelect={() => {
                                                setSelectedProvince(p)
                                                setSelectedDistrict(null)
                                                setSelectedWard(null)
                                                setOpenProvince(false)
                                            }}
                                        >
                                            {p.ProvinceName}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                {/* District */}
                <Popover open={openDistrict} onOpenChange={setOpenDistrict}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-between"
                            disabled={!selectedProvince}
                        >
                            {selectedDistrict ? selectedDistrict.DistrictName : "Select district"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                        <Command>
                            <CommandInput placeholder="Search district..." />
                            <CommandList>
                                <CommandEmpty>Not found</CommandEmpty>
                                <CommandGroup>
                                    {districts.map((d) => (
                                        <CommandItem
                                            key={d.DistrictID}
                                            onSelect={() => {
                                                setSelectedDistrict(d)
                                                setSelectedWard(null)
                                                setOpenDistrict(false)
                                            }}
                                        >
                                            {d.DistrictName}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                {/* Ward */}
                <Popover open={openWard} onOpenChange={setOpenWard}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-between"
                            disabled={!selectedDistrict}
                        >
                            {selectedWard ? selectedWard.WardName : "Select ward"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                        <Command>
                            <CommandInput placeholder="Search ward..." />
                            <CommandList>
                                <CommandEmpty>Not found</CommandEmpty>
                                <CommandGroup>
                                    {wards.map((w) => (
                                        <CommandItem
                                            key={w.WardCode}
                                            onSelect={() => {
                                                setSelectedWard(w)
                                                setOpenWard(false)
                                            }}
                                        >
                                            {w.WardName}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            {field?.errors?.address && (
                <p className="mt-1 text-xs text-destructive">
                    {field?.errors?.address?.message}
                </p>
            )}
        </>
    )
}

export default AddressCustomize

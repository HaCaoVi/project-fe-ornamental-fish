"use client"

import { useState } from "react"
import { Button } from "@components/ui/button"
import { cn } from "@components/lib/utils"

const categories = [
  { id: "all", label: "All Articles" },
  { id: "care-tips", label: "Care Tips" },
  { id: "food", label: "Food & Nutrition" },
  { id: "aquarium-setup", label: "Aquarium Setup" },
  { id: "species", label: "Species Guide" },
  { id: "health", label: "Health & Wellness" },
]

export function CategoryFilter() {
  const [selected, setSelected] = useState("all")

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selected === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => setSelected(category.id)}
          className={cn("rounded-full transition-all", selected === category.id && "shadow-md")}
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}

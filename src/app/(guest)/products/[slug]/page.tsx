import { ProductFilters } from "@components/features/Product/product-filter";
import { ProductGrid } from "@components/features/Product/product-grid";

export default function ProductsPage() {
    return (
        <div className="container mx-auto px-4 py-5">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">Aquarium Fish Store</h1>
                <p className="text-muted-foreground">Discover our finest collection of tropical fish</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-64 flex-shrink-0">
                    <ProductFilters />
                </aside>

                <div className="flex-1">
                    <ProductGrid />
                </div>
            </div>
        </div>
    )
}

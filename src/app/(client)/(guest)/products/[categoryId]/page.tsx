"use server"

import { ProductFilters } from "@components/features/Product/product-filter";
import ProductGrid from "@components/features/Product/product-grid";
import { listProductAPI } from "@lib/api/product";

const ProductsPage = async ({ params, searchParams }: any) => {
    const { categoryId } = await params;
    const { current, pageSize = 20, sort, search, filters } = await searchParams;

    const res = await listProductAPI(current, pageSize, categoryId, { ...filters, isActivated: true }, search, sort);

    const data = res.statusCode === 200 && res.data ? res.data.result : [];

    const meta = {
        current: res.data?.meta?.current || 1,
        pageSize: res.data?.meta?.pageSize || 10,
        pages: res.data?.meta?.pages || 1,
        total: res.data?.meta?.total || 0,
    }
    return (
        <div className="container mx-auto py-5">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">Aquarium Fish Store</h1>
                <p className="text-muted-foreground">Discover our finest collection of tropical fish</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-65 flex-shrink-0">
                    <ProductFilters categoryId={categoryId} />
                </aside>
                <div className="flex-1">
                    <ProductGrid data={data} meta={meta} />
                </div>
            </div>
        </div>
    )
}

export default ProductsPage;
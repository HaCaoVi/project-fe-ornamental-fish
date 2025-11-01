"use client"

import { ProductCard } from "./product-card"
import { IProduct } from "../../../types/model"
import { IMeta } from "../../../types/backend"
import PaginationCustomize from "@components/lib/Pagination"

interface IProps {
    data: IProduct[],
    meta: IMeta
}

const ProductGrid = ({ data, meta }: IProps) => {
    return (
        <div className="space-y-8">
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data && data.length > 0 && data.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {/* Pagination */}
            <PaginationCustomize meta={meta} />
        </div>
    )
}

export default ProductGrid;
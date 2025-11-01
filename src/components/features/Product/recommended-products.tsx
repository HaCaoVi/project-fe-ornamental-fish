"use server"

import { listRecommendProduct } from "@lib/api/product"
import { ProductCard } from "./product-card"

interface IProps {
    exclude: string,
    categoryId: string
}

const RecommendedProducts = async ({ categoryId, exclude }: IProps) => {
    const res = await listRecommendProduct(categoryId, exclude);
    const data = res.data ?? []
    return (
        <section className="py-12 border-t border-border/50">
            {data && data.length > 0 &&
                <>
                    <h2 className="text-3xl font-bold text-foreground mb-8">Related Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </>
            }

        </section>
    )
}

export default RecommendedProducts;

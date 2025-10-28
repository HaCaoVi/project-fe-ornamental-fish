"use server"

import { ProductDetailView } from "@components/features/Product/product-detail-view"
import RecommendedProducts from "@components/features/Product/recommended-products"
import { AutoBreadcrumb } from "@components/lib/Breadcrumb"
import { getProductByCode } from "@lib/api/product"

const ProductDetailPage = async ({ params }: any) => {
    const { code } = await params;
    const res = await getProductByCode(code);

    return (
        <main className="flex-1 bg-background">
            <div className="container mx-auto px-4 py-8">
                <AutoBreadcrumb />
                {res.data && <ProductDetailView product={res.data} />}
                <RecommendedProducts categoryId={res.data?.categoryDetail._id + ""} exclude={res.data?._id + ""} />
            </div>
        </main>
    )
}

export default ProductDetailPage;

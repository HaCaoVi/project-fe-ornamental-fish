import ProductTable from "@components/features/Table/product.table";
import { listProductAPI } from "@lib/api/product";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Product Page",
};


const ProductDashboard = async ({ searchParams }: any) => {
    const { current, pageSize, sort, search, filters, category } = await searchParams;

    const res = await listProductAPI(current, pageSize, category, filters, search, sort);

    const data = res.statusCode === 200 && res.data ? res.data.result : [];

    const meta = {
        current: res.data?.meta?.current || 1,
        pageSize: res.data?.meta?.pageSize || 10,
        pages: res.data?.meta?.pages || 1,
        total: res.data?.meta?.total || 0,
    }
    return (
        <ProductTable data={data} meta={meta} />
    )
}

export default ProductDashboard;
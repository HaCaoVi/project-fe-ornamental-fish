import CategoryTable from "@components/features/Table/category.table";
import { listCategoryDetailAPI } from "@lib/api/category"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Category Page",
};


const CategoryPage = async ({ searchParams }: any) => {
    const { current, pageSize, filters, search } = await searchParams;
    const res = await listCategoryDetailAPI(current, pageSize, filters, search)

    const data = res.statusCode === 200 && res.data ? res.data.result : []
    const meta = {
        current: res.data?.meta?.current || 1,
        pageSize: res.data?.meta?.pageSize || 10,
        pages: res.data?.meta?.pages || 1,
        total: res.data?.meta?.total || 0,
    }
    return (
        <CategoryTable data={data} meta={meta} />
    )
}

export default CategoryPage;
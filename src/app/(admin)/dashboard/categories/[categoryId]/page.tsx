"use server"

import CategoryTable from "@components/features/Table/category.table";
import { listCategoryDetailAPI } from "@lib/api/category"

const CategoryPage = async ({ params, searchParams }: any) => {
    const { current, pageSize } = await searchParams;
    const { categoryId } = await params;
    const res = await listCategoryDetailAPI(categoryId, current, pageSize)

    const data = res.statusCode === 200 && res.data ? res.data.result : []
    const meta = {
        current: res.data?.meta?.current || 1,
        pageSize: res.data?.meta?.pageSize || 10,
        pages: res.data?.meta?.pages || 1,
        total: res.data?.meta?.total || 1,
    }

    return (
        <CategoryTable data={data} meta={meta} />
    )
}

export default CategoryPage;
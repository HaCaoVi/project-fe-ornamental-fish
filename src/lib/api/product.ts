"use server"

import sendRequest from "@config/fetch.config";
import { IBackendRes, IPagination } from "../../types/backend";
import { IProduct } from "../../types/model";
import { revalidateTag } from "next/cache";
const LIST_PRODUCT_TAG = "list-product";

export const listProductAPI = async (
    current: number,
    pageSize: number,
    categoryId: string,
    filters?: any,
    search?: string,
    sort?: string,
) => {
    const query: Record<string, string> = {
        current: String(current ?? 1),
        pageSize: String(pageSize ?? 10),
        categoryId: String(categoryId),
    }
    if (sort) query.sort = sort
    if (filters) query.filters = typeof filters === "string" ? filters : JSON.stringify(filters)
    if (search) query.search = search

    const params = new URLSearchParams(query).toString()
    const url = `/api/v1/products/list-product?${params}`
    return sendRequest<IBackendRes<IPagination<IProduct[]>>>(url, {
        method: "GET",
        next: { tags: [LIST_PRODUCT_TAG], revalidate: 60 },
    },)
}
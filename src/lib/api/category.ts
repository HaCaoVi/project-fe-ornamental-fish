"use server"

import sendRequest from "@config/fetch.config";
import { IBackendRes, IPagination } from "../../types/backend";
import { ICategories } from "../../types/model";

export const listCategoryAPI = async () => {
    const url = `/api/v1/categories/list-category`
    return sendRequest<IBackendRes<ICategories[]>>(url, {
        method: "GET",
        next: { revalidate: 24 * 60 * 60 * 1000 }
    })
};

export const listCategoryDetailAPI = async (
    categoryId: string,
    current: number,
    pageSize: number,
) => {
    const query: Record<string, string> = {
        current: String(current),
        pageSize: String(pageSize),
    }
    const params = new URLSearchParams(query).toString()
    const url = `/api/v1/categories/list-category-detail/${categoryId}?${params}`
    return sendRequest<IBackendRes<IPagination<ICategories[]>>>(url, {
        method: "GET",
    },)
}
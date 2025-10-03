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
    current: number,
    pageSize: number,
    filters?: any,
    search?: string,
) => {
    const query: Record<string, string> = {
        current: String(current),
        pageSize: String(pageSize),
    }

    if (filters) query.filters = typeof filters === "string" ? filters : JSON.stringify(filters)
    if (search) query.search = search

    const params = new URLSearchParams(query).toString()
    const url = `/api/v1/categories/list-category-detail?${params}`
    return sendRequest<IBackendRes<IPagination<ICategories[]>>>(url, {
        method: "GET",
    },)
}
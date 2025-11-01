"use server"

import sendRequest from "@config/fetch.config";
import { IBackendRes, IPagination } from "../../types/backend";
import { IAllFollowCategory, ICategories, ICategoryDetail } from "../../types/model";
import { revalidateTag } from "next/cache";
import { LIST_CATEGORY_DETAIL_TAG } from "@lib/constants/tag.constant";

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
        current: String(current ?? 1),
        pageSize: String(pageSize ?? 10),
    }

    if (filters) query.filters = typeof filters === "string" ? filters : JSON.stringify(filters)
    if (search) query.search = search

    const params = new URLSearchParams(query).toString()
    const url = `/api/v1/categories/list-category-detail?${params}`
    return sendRequest<IBackendRes<IPagination<ICategoryDetail[]>>>(url, {
        method: "GET",
        next: { tags: [LIST_CATEGORY_DETAIL_TAG], revalidate: 60 },
    },)
}

export const createCategoryAPI = async (name: string, category: string) => {
    const url = `/api/v1/categories/create-category-detail`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "POST",
        body: JSON.stringify({
            name, category
        }),
    })
    if (res.statusCode === 201) {
        revalidateTag(LIST_CATEGORY_DETAIL_TAG);
    }
    return res;
};

export const updateCategoryAPI = async (categoryDetailId: string, name: string, category: string) => {
    const url = `/api/v1/categories/update-category-detail/${categoryDetailId}`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "PATCH",
        body: JSON.stringify({
            name, category
        }),
    })
    if (res.statusCode === 200) {
        revalidateTag(LIST_CATEGORY_DETAIL_TAG);
    }
    return res;
};

export const deleteCategoryAPI = async (categoryDetailId: string) => {
    const url = `/api/v1/categories/delete-category-detail/${categoryDetailId}`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "DELETE"
    })
    if (res.statusCode === 200) {
        revalidateTag(LIST_CATEGORY_DETAIL_TAG);
    }
    return res;
};

export const listAllFollowCategoryAPI = async () => {
    const url = `/api/v1/categories/list-all-follow-category`
    return sendRequest<IBackendRes<IAllFollowCategory[]>>(url, {
        method: "GET",
        next: { revalidate: 24 * 60 * 60 * 1000 }
    })
};
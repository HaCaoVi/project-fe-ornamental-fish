"use server"

import sendRequest from "@config/fetch.config";
import { IBackendRes, IPagination, IRequireCreateProduct } from "../../types/backend";
import { IProduct } from "../../types/model";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
const LIST_PRODUCT_TAG = "list-product";

export const listProductAPI = async (
    current: number,
    pageSize: number,
    category: string,
    filters?: any,
    search?: string,
    sort?: string,
) => {
    const query: Record<string, string> = {
        current: String(current ?? 1),
        pageSize: String(pageSize ?? 10),
        category: String(category),
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

export const createProductAPI = async (required: IRequireCreateProduct) => {
    const cookieStore = await cookies();
    const url = `/api/v1/products/create-product`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "POST",
        body: JSON.stringify(required),
    })
    if (res.statusCode === 201) {
        revalidateTag(LIST_PRODUCT_TAG);
        cookieStore.delete("image_upload")
        cookieStore.delete("video_upload")
    }
    return res;
};

export const updateProductAPI = async (productId: string, required: IRequireCreateProduct) => {
    const url = `/api/v1/products/update-product/${productId}`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "PATCH",
        body: JSON.stringify(required),
    })
    if (res.statusCode === 200) {
        revalidateTag(LIST_PRODUCT_TAG);
    }
    return res;
};
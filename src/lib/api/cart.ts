"use server"

import sendRequest from "@config/fetch.config";
import { IBackendRes, IPagination } from "../../types/backend";
import { revalidateTag } from "next/cache";
import { COUNT_CART_TAG } from "@lib/constants/tag.constant";
import { ICart } from "../../types/model";

export const createCartAPI = async (productId: string, quantity: number) => {
    const url = `/api/v1/carts/create-cart`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "POST",
        body: JSON.stringify({
            product: productId, quantity
        }),
    })
    if (res.statusCode === 201) {
        revalidateTag(COUNT_CART_TAG)
    }
    return res;
};

export const countCartAPI = async () => {
    const url = `/api/v1/carts/count-cart`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "GET",
        next: { tags: [COUNT_CART_TAG] }
    })
    return res;
};

export const listCartAPI = async (
    current: number,
    pageSize: number,
) => {
    const query: Record<string, string> = {
        current: String(current ?? 1),
        pageSize: String(pageSize ?? 10),
    }
    const params = new URLSearchParams(query).toString()
    const url = `/api/v1/carts/list-cart?${params}`
    return sendRequest<IBackendRes<IPagination<ICart[]>>>(url, {
        method: "GET",
        next: { tags: [COUNT_CART_TAG], revalidate: 60 },
    },)
}

export const updateQuantityAPI = async (cartId: string, product: string, quantity: number) => {
    const url = `/api/v1/carts/update-quantity/${cartId}`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "PATCH",
        body: JSON.stringify({
            quantity, product
        }),
    })
    if (res.statusCode === 200) {
        revalidateTag(COUNT_CART_TAG)
    }
    return res;
}

export const deleteCartAPI = async (cartId: string) => {
    const url = `/api/v1/carts/delete-cart/${cartId}`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "DELETE",
    })
    if (res.statusCode === 200) {
        revalidateTag(COUNT_CART_TAG)
    }
    return res;
}
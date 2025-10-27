"use server"

import sendRequest from "@config/fetch.config";
import { IBackendRes } from "../../types/backend";
import { revalidateTag } from "next/cache";
import { COUNT_CART_TAG } from "@lib/constants/tag.constant";

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
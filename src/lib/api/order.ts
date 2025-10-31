"use server"

import sendRequest from "@config/fetch.config";
import { IBackendRes, IPagination } from "../../types/backend";
import { PaymentFormData } from "@components/features/Payment/payment-page";
import { revalidateTag } from "next/cache";
import { COUNT_CART_TAG, LIST_ORDER_OF_USER_TAG } from "@lib/constants/tag.constant";
import { IOrder } from "../../types/model";

export const createOrderAPI = async (info: PaymentFormData, orderItems: any, listCartId: string[]) => {
    const { paymentMethod, ...rest } = info
    const url = `/api/v1/orders/create-order`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "POST",
        body: JSON.stringify({
            ...rest, payment: { method: paymentMethod }, orderItems, listCartId
        }),
    })
    if (res.statusCode === 201) {
        revalidateTag(COUNT_CART_TAG)
        revalidateTag(LIST_ORDER_OF_USER_TAG)
    }
    return res;
};

export const listOrderOfUserAPI = async (
    current: number,
    pageSize: number,
    filters?: any,
) => {
    const query: Record<string, string> = {
        current: String(current ?? 1),
        pageSize: String(pageSize ?? 10),
    }
    if (filters) query.filters = typeof filters === "string" ? filters : JSON.stringify(filters)
    const params = new URLSearchParams(query).toString()
    const url = `/api/v1/orders/list-order-of-user?${params}`
    return sendRequest<IBackendRes<IPagination<IOrder[]>>>(url, {
        method: "GET",
        next: { tags: [LIST_ORDER_OF_USER_TAG], revalidate: 60 },
    },)
}

export const cancelOrderAPI = async (orderId: string) => {
    const url = `/api/v1/orders/cancel-order/${orderId}`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "DELETE",
    })
    if (res.statusCode === 200) {
        revalidateTag(LIST_ORDER_OF_USER_TAG)
    }
    return res;
};
"use server"

import sendRequest from "@config/fetch.config";
import { IBackendRes, IPagination } from "../../types/backend";
import { IUser } from "../../types/model";
import { revalidateTag } from "next/cache";
// import instance from "@config/axios.config";
const LIST_USER_TAG = "list-user";

export const listUserAPI = async (
    current: number,
    pageSize: number,
    filters?: any,
    search?: any,
    sort?: string,
    populate?: string,
    fields?: string
) => {
    const query: Record<string, string> = {
        current: String(current),
        pageSize: String(pageSize),
    }
    if (populate) query.populate = populate
    if (sort) query.sort = sort
    if (fields) query.fields = fields
    if (filters) query.filters = typeof filters === "string" ? filters : JSON.stringify(filters)
    if (search) query.search = search

    const params = new URLSearchParams(query).toString()
    const url = `/api/v1/users/list-user?${params}`
    return sendRequest<IBackendRes<IPagination<IUser[]>>>(url, {
        method: "GET",
        next: { tags: [LIST_USER_TAG], revalidate: 60 },
    },)
}

export const createUserAPI = async (name: string, email: string, password: string, birthday: Date, gender: string, address: string, role: string, isActivated: boolean) => {
    const url = `/api/v1/users/create-user`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "POST",
        body: JSON.stringify({
            name, email, password, birthday: birthday.toISOString(), gender, address, role, isActivated
        }),
    })
    if (res.statusCode === 201) {
        revalidateTag(LIST_USER_TAG);
    }
    return res;
};

export const updateUserAPI = async (userId: string, name: string, birthday: Date, gender: string, address: string, role: string, isActivated: boolean) => {
    const url = `/api/v1/users/update-user/${userId}`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "PATCH",
        body: JSON.stringify({
            name, birthday, gender, address, role, isActivated
        })
    })
    if (res.statusCode === 200) {
        revalidateTag(LIST_USER_TAG);
    }
    return res;
};

export const deleteUserAPI = async (userId: string) => {
    const url = `/api/v1/users/delete-user/${userId}`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "DELETE"
    })
    if (res.statusCode === 200) {
        revalidateTag(LIST_USER_TAG);
    }
    return res;
};

export const banOrUnBanUserAPI = async (userId: string, isBanned: boolean) => {
    const url = `/api/v1/users/update-user/${userId}`
    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "PATCH",
        body: JSON.stringify({
            isBanned
        })
    })
    if (res.statusCode === 200) {
        revalidateTag(LIST_USER_TAG);
    }
    return res;
};
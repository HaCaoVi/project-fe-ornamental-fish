"use server"

import { IBackendRes, IPagination } from "../../types/backend";
import instance from "@config/axios.config";

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

    return instance.get<any, IBackendRes<IPagination<any[]>>>(url)
}


export const createUserAPI = async (name: string, email: string, password: string, birthday: Date, gender: string, address: string, role: string, isActivated: boolean) => {
    const url = `/api/v1/users/create-user`
    return instance.post<any, IBackendRes<any>>(url, {
        name, email, password, birthday, gender, address, role, isActivated
    });
};

export const updateUserAPI = async (userId: string, name: string, birthday: Date, gender: string, address: string, role: string, isActivated: boolean) => {
    const url = `/api/v1/users/update-user/${userId}`
    return instance.patch<any, IBackendRes<any>>(url, {
        name, birthday, gender, address, role, isActivated
    });
};

export const deleteUserAPI = async (userId: string) => {
    const url = `/api/v1/users/delete-user/${userId}`
    return instance.delete<any, IBackendRes<any>>(url);
};

export const banOrUnBanUserAPI = async (userId: string, isBanned: boolean) => {
    const url = `/api/v1/users/update-user/${userId}`
    return instance.patch<any, IBackendRes<any>>(url, { isBanned });
};
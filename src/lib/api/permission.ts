"use server"

import instance from "@config/axios.config";
import { IBackendRes, IPagination } from "../../types/backend";
import { IPermission } from "../../types/model";
import { isEmptyObject } from "@lib/helpers/valid.helper";

export const listPermissionAPI = async (
    current: number,
    pageSize: number,
    filters?: any,
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
    if (filters && !isEmptyObject(filters)) {
        query.filters = JSON.stringify(filters)
    }
    const params = new URLSearchParams(query).toString()
    const url = `/api/v1/permissions/list-permission?${params}`
    return instance.get<any, IBackendRes<IPagination<IPermission[]>>>(url);
};
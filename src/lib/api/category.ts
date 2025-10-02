"use server"

import sendRequest from "@config/fetch.config";
import { IBackendRes } from "../../types/backend";
import { ICategories } from "../../types/model";

export const listCategoryAPI = async () => {
    const url = `/api/v1/categories/list-category`
    return sendRequest<IBackendRes<ICategories[]>>(url, {
        method: "GET",
        next: { revalidate: 24 * 60 * 60 * 1000 }
    })
};
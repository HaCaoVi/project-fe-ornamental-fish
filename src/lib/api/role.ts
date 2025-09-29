"use server"

import sendRequest from "@config/fetch.config";
import { IBackendRes } from "../../types/backend";
import { IRole } from "../../types/model";

export const listRoleAPI = async () => {
    const url = `/api/v1/roles/list-role`
    return sendRequest<IBackendRes<IRole[]>>(url, {
        method: "GET",
    })
};
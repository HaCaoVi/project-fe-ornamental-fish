"use server"

import instance from "@config/axios.config";
import { IBackendRes, IPagination } from "../../types/backend";
import { IRole } from "../../types/model";

export const listRoleAPI = async () => {
    const url = `/api/v1/roles/list-role`
    return instance.get<any, IBackendRes<IRole[]>>(url);
};

export const createRoleAPI = async (name: string, description: string, isActive: boolean, permissions: string[]) => {
    const url = `/api/v1/roles/create-role`
    return instance.post<any, IBackendRes<IRole>>(url, {
        name, description, isActive, permissions
    });
};
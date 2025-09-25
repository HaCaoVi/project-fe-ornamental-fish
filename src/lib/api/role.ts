import instance from "@config/axios.config";
import { IBackendRes, IPagination } from "../../types/backend";
import { IRole } from "../../types/model";

export const listRoleAPI = async (
    current: number,
    pageSize: number,
    populate?: string,
    sort?: string,
    fields?: string
) => {
    const url = `/api/v1/roles/list-role?current=${current}&pageSize=${pageSize}&sort=${sort}&populate=${populate}&fields=${fields}`;
    return instance.get<any, IBackendRes<IPagination<IRole[]>>>(url);
};
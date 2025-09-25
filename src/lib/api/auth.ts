"use server"

import instance from "@config/axios.config";
import { IBackendRes, ILogin, IUserLogin } from "../../types/backend";

export const loginAPI = async (
    username: string,
    password: string
) => {
    const url = `/api/v1/auth/login`;
    return instance.post<any, IBackendRes<ILogin>>(url, { username, password });
};

export const getAccountAPI = async () => {
    const url = `/api/v1/auth/account`;
    return instance.get<any, IBackendRes<IUserLogin>>(url);
};

export const refreshTokenAPI = async () => {
    return instance.get<any, IBackendRes<any>>('/api/v1/auth/refresh-token');
}
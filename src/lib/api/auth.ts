import instance from "@/config/axios.config";
import { IBackendRes, ILogin } from "@/types/backend";

export const loginAPI = async (
    username: string,
    password: string
) => {
    const url = `/api/v1/auth/login`;
    return instance.post<any, IBackendRes<ILogin>>(url, { username, password });
};

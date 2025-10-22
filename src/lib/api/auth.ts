"use server";

import { RegisterFormData } from "@app/(client)/auth/register/page";
import { IBackendRes, ILogin, IUserLogin } from "../../types/backend";
import sendRequest from "@config/fetch.config";
import { cookies } from "next/headers";
import { ActivateAccountFormData } from "@components/features/Modal/Auth/auth-code.modal";

export const getAccountAPI = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!accessToken && !refreshToken) return null;
    return sendRequest<IBackendRes<IUserLogin>>("/api/v1/auth/account", {
        method: "GET",
    });
};

export const logoutAPI = async () => {
    const cookieStore = await cookies();
    const res = await sendRequest<IBackendRes<any>>("/api/v1/auth/logout", {
        method: "POST",
    });
    if (res.statusCode === 201) {
        cookieStore.delete("refresh_token")
        cookieStore.delete("access_token")
    }
    return res;
};

export const registerAPI = async (data: Omit<RegisterFormData, "confirmPassword">) => {
    const res = await sendRequest<IBackendRes<ILogin>>("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({ ...data }),
    });
    return res;
};

export const activateAccountAPI = async (data: ActivateAccountFormData) => {
    const res = await sendRequest<IBackendRes<ILogin>>("/api/v1/auth/active-account", {
        method: "PATCH",
        body: JSON.stringify({ ...data }),
    });
    return res;
};

export const retryAccountAPI = async (email: string) => {
    const res = await sendRequest<IBackendRes<ILogin>>("/api/v1/auth/retry-active", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
    return res;
};

export const loginWithGoogleAPI = async () => {
    return sendRequest<IBackendRes<ILogin>>("/api/v1/auth/google", {
        method: "GET",
    });
};
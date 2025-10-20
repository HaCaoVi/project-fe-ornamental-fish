"use server";

import { RegisterFormData } from "@app/(client)/register/page";
import { IBackendRes, ILogin, IUserLogin } from "../../types/backend";
import sendRequest from "@config/fetch.config";
import { cookieOptions } from "@lib/constants/constant";
import { cookies } from "next/headers";
import { ActivateAccountFormData } from "@components/features/Modal/Auth/auth-code.modal";

export const loginAPI = async (username: string, password: string) => {
    const cookieStore = await cookies();
    const res = await sendRequest<IBackendRes<ILogin>>("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
    if (res.statusCode === 201 && res.data) {
        cookieStore.set("refresh_token", res.data.refresh_token, {
            ...cookieOptions,
            maxAge: 60 * 60 * 24 * 30,
        });
        cookieStore.set("access_token", res.data.access_token, {
            ...cookieOptions,
            maxAge: 60 * 60 * 24,
        });
    }

    return res;
};

export const getAccountAPI = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!accessToken && !refreshToken) return null;
    return sendRequest<IBackendRes<IUserLogin>>("/api/v1/auth/account", {
        method: "GET",
    });
};

export const refreshTokenAPI = async (refreshToken: string) => {
    const cookieStore = await cookies();

    const res = await sendRequest<IBackendRes<any>>("/api/v1/auth/refresh", {
        method: "GET",
        headers: {
            Cookie: `refresh_token=${refreshToken}`,
        },
    });

    if (res.statusCode === 200 && res.data) {
        cookieStore.set("refresh_token", res.data.refresh_token, {
            ...cookieOptions,
            maxAge: 60 * 60 * 24 * 30,
        });
        cookieStore.set("access_token", res.data.access_token, {
            ...cookieOptions,
            maxAge: 30,
        });
    }

    return res;
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
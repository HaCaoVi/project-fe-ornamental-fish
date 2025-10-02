"use server";

import { IBackendRes, ILogin, IUserLogin } from "../../types/backend";
import sendRequest from "@config/fetch.config";
import { cookies } from "next/headers";

const cookieOptions: any = {
    httpOnly: true,
    sameSite: "strict",
    // secure: process.env.NODE_ENV === "production",
};

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
            maxAge: 30,
        });
    }

    return res;
};

export const getAccountAPI = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) return null;
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

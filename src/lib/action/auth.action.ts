"use server";

import { MAX_AGE_ACCESS_TOKEN, MAX_AGE_REFRESH_TOKEN } from "@lib/constants/constant";
import { cookies } from "next/headers";
import { setTokenCookie } from "./set-token.action";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function loginAction(username: string, password: string) {
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok && data?.data) {
        await setTokenCookie(data.data.access_token, data.data.refresh_token)
    }
    return data;
}

export async function loginWithGoogleAction(token: string) {
    const cookieStore = await cookies();
    cookieStore.set("access_token", token, { httpOnly: true, maxAge: MAX_AGE_ACCESS_TOKEN });
}

export async function refreshTokenAction(): Promise<string | null> {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!refreshToken) return null;

    const res = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
        method: "GET",
        headers: {
            Cookie: `refresh_token=${refreshToken}`,
        },
        credentials: "include",
    });

    const data = await res.json();

    if (res.ok && data?.data?.access_token) {
        await setTokenCookie(data.data.access_token, data.data.refresh_token)
        return data.data.access_token;
    }
    return null;
}

export const getAccountAPI = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!accessToken && !refreshToken) return null;

    const res = await fetch(`${BASE_URL}/api/v1/auth/account`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 60 },
    });

    return res.json();
};

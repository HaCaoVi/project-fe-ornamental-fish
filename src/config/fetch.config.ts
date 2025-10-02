"use server";

import { refreshTokenAPI } from "@lib/api/auth";
import { Mutex } from "async-mutex";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const mutex = new Mutex();
const NO_RETRY_HEADER = "x-no-retry";

const handleRefreshToken = async (refreshToken: string): Promise<string | null> => {
    return await mutex.runExclusive(async () => {
        const res = await refreshTokenAPI(refreshToken);
        if (res && res.statusCode === 200 && res.data) {
            return res.data.access_token;
        }
        return null;
    });
};

interface FetchConfig extends RequestInit {
    rawResponse?: boolean;
}

const sendRequest = async <T = any>(
    url: string,
    options: FetchConfig = {}
): Promise<T> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    const headers = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
    });

    if (options.headers) {
        new Headers(options.headers).forEach((v, k) => headers.set(k, v));
    }

    if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
    }

    let res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers,
        credentials: "include",
    });

    // Nếu bị 401 thì thử refresh token
    if (refreshToken && res.status === 401 && !headers.has(NO_RETRY_HEADER) && url !== "/api/v1/auth/login") {
        const newToken = await handleRefreshToken(refreshToken);
        if (newToken) {
            headers.set("Authorization", `Bearer ${newToken}`);
            headers.set(NO_RETRY_HEADER, "true");

            res = await fetch(`${BASE_URL}${url}`, {
                ...options,
                headers,
                credentials: "include",
            });
        }
    }

    if (res.status === 400 && url.includes("/auth/refresh")) {
        throw new Error("Your session has expired. Please log in again.");
    }

    if (options.rawResponse) return res as unknown as T;

    const text = await res.text();

    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}: ${text}`);
    }

    try {
        return JSON.parse(text) as T;
    } catch {
        return text as unknown as T;
    }
};

export default sendRequest;
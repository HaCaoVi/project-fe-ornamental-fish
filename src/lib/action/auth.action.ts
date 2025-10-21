"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

// 🟩 Login (được gọi từ client-side)
export async function loginAction(username: string, password: string) {
    const cookieStore = await cookies();
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data?.data) {
        cookieStore.set("access_token", data.data.access_token, { httpOnly: true });
        cookieStore.set("refresh_token", data.data.refresh_token, { httpOnly: true });
    }

    return data;
}

// 🟩 Refresh token (được gọi từ fetch.config.ts)
export async function refreshTokenAction(): Promise<string | null> {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!refreshToken) return null;

    const res = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${refreshToken}` },
        credentials: "include",
    });

    const data = await res.json();

    if (res.ok && data?.data?.access_token) {
        cookieStore.set("access_token", data.data.access_token, { httpOnly: true });
        cookieStore.set("refresh_token", data.data.refresh_token, { httpOnly: true });
        return data.data.access_token;
    }

    return null;
}

// 🟩 Logout
export async function logoutAction() {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
}

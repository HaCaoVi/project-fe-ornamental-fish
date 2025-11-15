"use client";

import { getCookie } from "@lib/helpers/cookie.helper";
import { IBackendRes, ILogin } from "../../types/backend";

export async function loginAction(username: string, password: string): Promise<IBackendRes<ILogin>> {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    return res.json();
}

export async function loginWithGoogleAction(token: string) {
    // const cookieStore = await cookies();
    // cookieStore.set("access_token", token, { httpOnly: true, maxAge: MAX_AGE_ACCESS_TOKEN });
}

export const getAccountAPI = async () => {
    if (!getCookie("access_token")) return null

    const res = await fetch(`/api/auth/account`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
        },
        next: { revalidate: 60 },
    });
    if (!res) return null
    return res.json();
};

"use server"

import { MAX_AGE_ACCESS_TOKEN, MAX_AGE_REFRESH_TOKEN } from "@lib/constants/constant";
import { cookies } from "next/headers";

export const setTokenCookie = async (access_token: string, refresh_token: string) => {
    const cookieStore = await cookies();
    cookieStore.set("access_token", access_token, { httpOnly: true, maxAge: MAX_AGE_ACCESS_TOKEN });
    cookieStore.set("refresh_token", refresh_token, { httpOnly: true, maxAge: MAX_AGE_REFRESH_TOKEN });
}
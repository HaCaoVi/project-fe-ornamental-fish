// /app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { IBackendRes, ILogin } from "../../../../types/backend";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    // Gọi NestJS login API
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: `refresh_token=${refreshToken ?? ""}`,
        },
    });

    const data: IBackendRes<ILogin> = await response.json();
    const res = NextResponse.json({ ...data, data: { access_token: data?.data?.access_token } });
    if (data.statusCode === 200 && data.data) {
        res.cookies.set("refresh_token", data.data.refresh_token + "", {
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });
    }
    return res
}

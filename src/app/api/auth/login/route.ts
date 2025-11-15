// /app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { IBackendRes, ILogin } from "../../../../types/backend";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data: IBackendRes<ILogin> = await response.json();

    const res = NextResponse.json({ ...data, data: { access_token: data?.data?.access_token, user: data.data?.user } });
    if (data.statusCode === 201 && data.data) {
        res.cookies.set("refresh_token", data.data.refresh_token + "", {
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });
    }
    return res;
}

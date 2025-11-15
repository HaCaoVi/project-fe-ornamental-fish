import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshTokenAction } from "@lib/api/auth";

const fetchGetAccount = async (accessToken: string) => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/account`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

export async function GET(req: Request) {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    const accessToken = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!accessToken || !refreshToken) {
        return null
    }

    let data = await fetchGetAccount(accessToken);
    console.log(">>>>>>dataL ", data);

    if (data.statusCode === 401 && !req.headers.get("X-Retry")) {
        const refreshed = await refreshTokenAction();
        if (refreshed.statusCode === 201 && refreshed.data?.access_token) {
            const retryData = await fetchGetAccount(refreshed.data.access_token);
            return NextResponse.json({ ...retryData, access_token: refreshed.data.access_token });
        }
        const res = NextResponse.json({ message: "Session expired", ...data });
        res.cookies.set("refresh_token", "", { maxAge: 0 });
        return res;
    }
    return NextResponse.json(data);
}

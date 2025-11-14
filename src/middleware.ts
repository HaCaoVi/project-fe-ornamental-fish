import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const decodeToken = (token: string) => {
    try {
        const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
        return payload?.role || "GUEST";
    } catch {
        return "GUEST";
    }
}

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token")?.value;
    const role = token ? decodeToken(token) : "GUEST";
    const url = req.nextUrl.pathname;

    if (role === "GUEST") {
        if (url.startsWith("/dashboard") || url.startsWith("/order")) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    if (role === "CUSTOMER") {
        if (url.startsWith("/dashboard") || url.startsWith("/auth/login") || url.startsWith("/auth/register")) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    if (role === "ADMIN" || role === "STAFF") {
        if (!url.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

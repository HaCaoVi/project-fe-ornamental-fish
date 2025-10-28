"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginWithGoogleAction } from "@lib/action/auth.action";
import { useAuthContext } from "@hooks/app.hook";
import { notify } from "@lib/helpers/notify";

export default function AuthSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { fetchUser } = useAuthContext();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            (async () => {
                await loginWithGoogleAction(token);
                await fetchUser();
                notify.success("Login successfully");
                router.replace("/");
            })();
        } else {
            router.push("/auth/login");
        }
    }, [router, searchParams]);

    return null;
}

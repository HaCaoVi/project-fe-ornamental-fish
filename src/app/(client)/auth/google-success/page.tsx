"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            localStorage.setItem("accessToken", token);
            alert("Đăng nhập Google thành công!");
            router.push("/"); // quay về trang chủ
        } else {
            router.push("/login");
        }
    }, [router, searchParams]);

    return <p>Đang đăng nhập...</p>;
}

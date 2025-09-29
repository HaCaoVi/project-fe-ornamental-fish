"use client";

import { useAuthContext } from "@hooks/auth.hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
    allowedRoles: string[];
    children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: Props) => {
    const { user, isLoading } = useAuthContext()!;
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) router.push("/login");

            else if (!allowedRoles.includes(user.role.name)) router.push("/unauthorized");
        }
    }, [user, isLoading]);

    if (isLoading || !user || !allowedRoles.includes(user.role.name)) return null;

    return <>{children}</>;
}
export default ProtectedRoute;
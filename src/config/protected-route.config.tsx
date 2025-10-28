"use client";

import ModelAuthRoute from "@components/lib/ModalAuthRoute";
import { useAuthContext } from "@hooks/app.hook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    allowedRoles: string[];
    children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: Props) => {
    const { user, isLoading } = useAuthContext()!;
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                setShowModal(true);
            } else if (!allowedRoles.includes(user.role)) {
                router.push("/unauthorized");
            }
        }
    }, [user, isLoading, allowedRoles, router]);

    if (isLoading) return null;

    if (!user) {
        return <ModelAuthRoute open={showModal} onOpenChange={setShowModal} />;
    }

    if (!allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

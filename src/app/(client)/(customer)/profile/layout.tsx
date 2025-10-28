import type { Metadata } from "next";
import "@styles/globals.css";
import ProtectedRoute from "@config/protected-route.config";
import { ADMIN_ROLE, CUSTOMER_ROLE, STAFF_ROLE } from "@lib/constants/constant";

export const metadata: Metadata = {
    title: "Home Page",
};

const CustomerLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <ProtectedRoute allowedRoles={[CUSTOMER_ROLE, ADMIN_ROLE, STAFF_ROLE]}>
            {children}
        </ProtectedRoute>
    );
}
export default CustomerLayout;
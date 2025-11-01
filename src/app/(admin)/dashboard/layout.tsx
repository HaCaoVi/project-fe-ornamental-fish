import ProtectedRoute from "@config/protected-route.config";
import { Metadata } from "next";
import DashboardLayout from "@components/features/DashboardLayout";
import { ADMIN_ROLE, STAFF_ROLE } from "@lib/constants/constant";

export const metadata: Metadata = {
    title: "Dashboard Page",
};

const DashboardLayoutRoot = ({ children }: { children: React.ReactNode }) => {

    return (
        <ProtectedRoute allowedRoles={[ADMIN_ROLE, STAFF_ROLE]}>
            <DashboardLayout>{children}</DashboardLayout>
        </ProtectedRoute>
    )
}
export default DashboardLayoutRoot;
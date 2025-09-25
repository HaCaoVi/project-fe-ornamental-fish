import ProtectedRoute from "@config/protected-route.config";
import { Metadata } from "next";
import DashboardShell from "@components/features/DashboardShell";

export const metadata: Metadata = {
    title: "Dashboard Page",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <DashboardShell>{children}</DashboardShell>
        </ProtectedRoute>
    )
}
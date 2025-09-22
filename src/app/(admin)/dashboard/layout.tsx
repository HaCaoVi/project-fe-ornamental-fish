import ProtectedRoute from "@/config/protected-route.config";

// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <ProtectedRoute allowedRoles={["ADMIN"]}>{children}</ProtectedRoute>;
}

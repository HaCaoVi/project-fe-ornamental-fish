import { DashboardContent } from "@components/layout/Test/dashboard-content"

const UserPage = () => {
    return (
        <div className="flex h-screen bg-background">
            <div className="flex flex-1 flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto">
                    <DashboardContent />
                </main>
            </div>
        </div>
    )
}
export default UserPage;
"use server"

import UserTable from "@components/features/Table/user.table"
import { Column, TableCustomize } from "@components/layout/Table"
import { listUserAPI } from "@lib/api/user"

// Sample data for demonstration
const sampleData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Moderator", status: "Active" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Pending" },
    { id: 6, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Pending" },
    { id: 7, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Pending" },
    { id: 8, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Pending" },
    { id: 9, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Pending" },
    { id: 10, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Pending" },
]

const sampleMeta = {
    current: 1,
    pageSize: 10,
    pages: 10,
    total: 5,
}
const UserDashboard = async ({ searchParams }: any) => {
    const { current, pageSize, sort, search, _id, ...filters } = await searchParams;

    const res = await listUserAPI(current, pageSize, filters, search, sort, "role");

    const data = res.statusCode === 200 && res.data ? res.data.result : []
    const meta = {
        current: res.data?.meta?.current || 1,
        pageSize: res.data?.meta?.pageSize || 10,
        pages: res.data?.meta?.pages || 1,
        total: res.data?.meta?.total || 1,
    }
    return (
        <UserTable data={data} meta={meta} />
    )
}

export default UserDashboard;
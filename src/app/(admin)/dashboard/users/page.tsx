"use client"

import { Column, TableCustomize } from "@components/layout/Table"

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

const columns: Column[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
        key: "status",
        label: "Status",
        render: (value: string) => (
            <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${value === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : value === "Inactive"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
            >
                {value}
            </span>
        ),
    },
]

export default function Home() {
    return (
        <main className="container mx-auto py-8 px-4">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Data Table</h1>
                    <p className="text-muted-foreground">A responsive, customizable data table with pagination</p>
                </div>

                <TableCustomize data={sampleData} meta={sampleMeta} columns={columns} />
            </div>
        </main>
    )
}

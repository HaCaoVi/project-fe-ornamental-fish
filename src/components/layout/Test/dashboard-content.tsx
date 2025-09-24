"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { Badge } from "@components/ui/badge"
import {
    TrendingUp,
    Users,
    DollarSign,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"

const stats = [
    {
        title: "Total Revenue",
        value: "$45,231.89",
        change: "+20.1%",
        trend: "up",
        icon: DollarSign,
    },
    {
        title: "Active Users",
        value: "2,350",
        change: "+180.1%",
        trend: "up",
        icon: Users,
    },
    {
        title: "Conversion Rate",
        value: "12.5%",
        change: "-4.3%",
        trend: "down",
        icon: TrendingUp,
    },
    {
        title: "Server Uptime",
        value: "99.9%",
        change: "+0.1%",
        trend: "up",
        icon: Activity,
    },
]

const recentActivity = [
    {
        id: "1",
        user: "Alice Johnson",
        email: "alice@example.com",
        action: "Created account",
        status: "Active",
        date: "2024-01-15",
    },
    {
        id: "2",
        user: "Bob Smith",
        email: "bob@example.com",
        action: "Made purchase",
        status: "Completed",
        date: "2024-01-14",
    },
    {
        id: "3",
        user: "Carol Davis",
        email: "carol@example.com",
        action: "Updated profile",
        status: "Active",
        date: "2024-01-14",
    },
    {
        id: "4",
        user: "David Wilson",
        email: "david@example.com",
        action: "Cancelled subscription",
        status: "Inactive",
        date: "2024-01-13",
    },
    {
        id: "5",
        user: "Eva Brown",
        email: "eva@example.com",
        action: "Submitted feedback",
        status: "Pending",
        date: "2024-01-13",
    },
]

export function DashboardContent() {
    return (
        <div className="p-6 space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-balance">Welcome back, John</h1>
                <p className="text-muted-foreground text-pretty">Here's what's happening with your projects today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight

                    return (
                        <Card key={stat.title} className="relative overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="flex items-center gap-1 text-xs">
                                    <TrendIcon className={`h-3 w-3 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                                    <span className="text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Analytics Overview</CardTitle>
                        <CardDescription>Your performance metrics for the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Chart visualization would go here</p>
                                <p className="text-sm">Integration with charting library needed</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Trends</CardTitle>
                        <CardDescription>Monthly revenue growth and projections</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Revenue chart would go here</p>
                                <p className="text-sm">Integration with charting library needed</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest user actions and system events</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentActivity.map((activity) => (
                                <TableRow key={activity.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{activity.user}</div>
                                            <div className="text-sm text-muted-foreground">{activity.email}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{activity.action}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                activity.status === "Active"
                                                    ? "default"
                                                    : activity.status === "Completed"
                                                        ? "secondary"
                                                        : activity.status === "Pending"
                                                            ? "outline"
                                                            : "destructive"
                                            }
                                        >
                                            {activity.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{activity.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between pt-4">
                        <p className="text-sm text-muted-foreground">Showing 1 to 5 of 47 results</p>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" disabled>
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <Button variant="outline" size="sm">
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

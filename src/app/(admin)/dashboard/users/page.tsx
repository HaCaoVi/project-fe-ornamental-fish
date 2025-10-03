"use server"

import UserTable from "@components/features/Table/user.table"
import { listUserAPI } from "@lib/api/user"

const UserDashboard = async ({ searchParams }: any) => {
    const { current, pageSize, sort, search, filters } = await searchParams;

    const res = await listUserAPI(current, pageSize, filters, search, sort);

    const data = res.statusCode === 200 && res.data ? res.data.result : []
    const meta = {
        current: res.data?.meta?.current || 1,
        pageSize: res.data?.meta?.pageSize || 10,
        pages: res.data?.meta?.pages || 1,
        total: res.data?.meta?.total || 0,
    }
    return (
        <UserTable data={data} meta={meta} />
    )
}

export default UserDashboard;
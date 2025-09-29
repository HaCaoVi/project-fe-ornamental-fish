"use server"

import RoleTable from "@components/features/Table/role.table";
import { listRoleAPI } from "@lib/api/role";

const RoleDashboard = async ({ searchParams }: any) => {
    const { current, pageSize, sort, search, _id, ...filters } = await searchParams;

    const res = await listRoleAPI(current, pageSize, filters, { name: `/${search}/i`, _id: `/${search}/i` }, sort, "permissions");

    const result = res.statusCode === 200 && res.data ? res.data.result : []
    const meta = {
        current: res.data?.meta?.current || 1,
        pageSize: res.data?.meta?.pageSize || 10,
        pages: res.data?.meta?.pages || 1,
        total: res.data?.meta?.total || 1,
    }
    return (
        <RoleTable data={result} meta={meta} />
    )
}

export default RoleDashboard;
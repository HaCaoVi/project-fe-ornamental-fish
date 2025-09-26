"use server"

import RoleTable from "@components/features/Table/role.table";
import { listRoleAPI } from "@lib/api/role";

const RoleDashboard = async ({ searchParams }: any) => {
    const { current, pageSize, sort, ...filters } = await searchParams;
    console.log(filters);

    const res = await listRoleAPI(current, pageSize, filters, sort, "permissions");


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
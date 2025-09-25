"use server"

import { Column, TableCustomize } from "@components/layout/Table";
import { listRoleAPI } from "@lib/api/role";

const RoleDashboard = async () => {
    const res = await listRoleAPI(1, 10, "permissions");
    const result = res.statusCode === 200 && res.data ? res.data.result : []
    console.log(">>>result: ", res);

    const columns: Column[] = [
        {
            key: "1",
            label: "ID",
        },
        {
            key: "name",
            label: "Name",
            sortable: true,
        },
        {
            key: "description",
            label: "Description",
            sortable: true,
        },
        {
            key: "isActive",
            label: "Active",
            sortable: true,
        },
    ]
    return (
        <TableCustomize columns={columns} data={result} />
    )
}

export default RoleDashboard;
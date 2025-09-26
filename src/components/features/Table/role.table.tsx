"use client"

import { Column, TableCustomize } from "@components/layout/Table";
import { IMeta } from "../../../types/backend";
import { Pencil, Trash2 } from "lucide-react";

interface IProps {
    data: any[],
    meta: IMeta,
}

const RoleTable = ({ data, meta }: IProps) => {

    const columns: Column[] = [
        {
            key: "_id",
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
            label: "Status",
            sortable: true,
            render: (value) => (<div>
                {value
                    ? <div>ACTIVE</div>
                    : <div>Inactive</div>
                }
            </div>)
        },
        {
            key: "action",
            label: "Action",
            sortable: true,
            render: (value, row) => {
                return (
                    <div className="flex">
                        <Pencil />
                        <Trash2 />
                    </div>
                )
            },
        },
    ]
    return (
        <TableCustomize columns={columns} data={data} meta={meta} />
    )
}

export default RoleTable;
import OrderTable from "@components/features/Table/order.table";
import { listOrderAPI } from "@lib/api/order";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Order Page",
};

const OrderDashboard = async ({ searchParams }: any) => {
    const { current, pageSize, sort, search, filters, category } = await searchParams;

    const res = await listOrderAPI(current, pageSize, category, filters, search, sort);

    const data = res.statusCode === 200 && res.data ? res.data.result : [];

    const meta = {
        current: res.data?.meta?.current || 1,
        pageSize: res.data?.meta?.pageSize || 10,
        pages: res.data?.meta?.pages || 1,
        total: res.data?.meta?.total || 0,
    }
    return (
        <OrderTable data={data} meta={meta} />
    )
}

export default OrderDashboard;
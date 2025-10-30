import OrdersPage from "@components/features/Order/order-page";
import { listOrderOfUserAPI } from "@lib/api/order";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Order Page",
};

const OrderRoot = async ({ searchParams }: any) => {
    const { current, pageSize } = await searchParams;
    const res = await listOrderOfUserAPI(current, pageSize)
    const data = res.statusCode === 200 && res.data ? res.data.result : []
    const meta = {
        current: res.data?.meta?.current || 1,
        pageSize: res.data?.meta?.pageSize || 10,
        pages: res.data?.meta?.pages || 1,
        total: res.data?.meta?.total || 0,
    }
    return <OrdersPage data={data} meta={meta} />
}
export default OrderRoot;    
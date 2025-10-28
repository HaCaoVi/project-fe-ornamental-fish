'use server'

import CartPage from "@components/features/Cart/cart-page";
import { listCartAPI } from "@lib/api/cart";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cart Page",
};

const CartRoot = async ({ searchParams }: any) => {
    const { current, pageSize } = await searchParams;
    const res = await listCartAPI(current, pageSize)
    const data = res.statusCode === 200 && res.data ? res.data.result : []
    const meta = {
        current: res.data?.meta?.current || 1,
        pageSize: res.data?.meta?.pageSize || 10,
        pages: res.data?.meta?.pages || 1,
        total: res.data?.meta?.total || 0,
    }
    return <CartPage data={data} meta={meta} />
}
export default CartRoot;    
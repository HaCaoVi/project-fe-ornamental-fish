import sendRequest from "@config/fetch.config";
import { IBackendRes } from "../../types/backend";

export const listProvince = async () => {
    const url = `/api/v1/ghn/list-province`
    return sendRequest<IBackendRes<any[]>>(url, {
        method: "GET",
    })
};

export const listDistrict = async (provinceId: string) => {
    const url = `/api/v1/ghn/list-district/${provinceId}`
    return sendRequest<IBackendRes<any[]>>(url, {
        method: "GET",
    })
};

export const listWard = async (districtId: string) => {
    const url = `/api/v1/ghn/list-ward/${districtId}`
    return sendRequest<IBackendRes<any[]>>(url, {
        method: "GET",
    })
};

export const calculateShippingFee = async (listProductOrder: { productId: string, quantity: number }[], toDistrictId: string, toWardCode: string) => {
    const url = `/api/v1/ghn/shipping-fee`
    return sendRequest<IBackendRes<any>>(url, {
        method: "POST",
        body: JSON.stringify({ listProductOrder, toDistrictId, toWardCode }),
    })
}
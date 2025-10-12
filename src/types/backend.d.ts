export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IMeta {
    current: number,
    pageSize: number,
    pages: number,
    total: number,
}

export interface IPagination<T> {
    meta: IMeta,
    result: T
}

export interface ILogin {
    refresh_token: string,
    access_token: string,
    user: IUserLogin
}

export interface IUserLogin {
    _id: string,
    email: string,
    name: string,
    role: {
        _id: string,
        name: string
    },
}

export interface IRequireCreateProduct {
    name: string,
    code?: string,
    description: string,
    price: number,
    discount: number,
    quantity: number,
    mainImageUrl: string,
    mainVideoUrl?: string | undefined,
    isActivated: boolean,
    categoryDetail: string
}
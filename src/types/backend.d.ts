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
    permissions: IPermissionLogin[]
}

export interface IPermissionLogin {
    _id: string,
    apiPath: string,
    method: string,
    module: string
}
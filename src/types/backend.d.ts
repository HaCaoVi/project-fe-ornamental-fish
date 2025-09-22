export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
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
    permissions: any[]
}
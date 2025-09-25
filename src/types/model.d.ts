export interface IRole {
    _id: string,
    name: string,
    description: string,
    isActive: boolean,
    permissions: string[] | IPermission[] | []
}

export interface IPermission {
    _id: string,
    apiPath: string,
    method: string,
    module: string,
    deletedAt: string,
    createdAt?: string,
    updatedAt: string,
}
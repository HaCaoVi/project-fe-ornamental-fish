export interface IRole {
    _id: string,
    name: string,
    description: string,
}

export interface IUser {
    _id: string,
    name: string,
    email: string,
    birthday: string,
    gender: "MALE" | "FEMALE" | "OTHER",
    address: string,
    accountType: string,
    role: IRole,
    isActivated: boolean,
    isDeleted: boolean,
    isBanned: boolean,
    createdBy: string,
    updatedBy: string,
    deletedBy: string,
    bannedBy: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export interface ICategories {
    _id: string,
    name: string
}
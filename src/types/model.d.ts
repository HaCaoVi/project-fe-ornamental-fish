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

export interface ICategoryDetail {
    _id: string,
    category: ICategories,
    name: string,
    isDeleted: boolean,
    createdBy: IUser,
    updatedBy: IUser,
    deletedBy: IUser,
    createdAt: string,
    updatedAt: string,
}

export interface IStock {
    _id: Types.ObjectId | string;
    quantity: number;
    sold: number;
}

export interface IProduct {
    _id: string;
    name: string;
    code: string;
    description: string;
    price: number;
    discount: number;
    mainImageUrl: string;
    mainVideoUrl: string;
    isActivated: boolean;
    isDeleted: boolean;
    categoryDetail: ICategoryDetail;
    createdBy: string;
    updatedBy: string;
    deletedBy?: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt?: Date | string;
    stock: IStock;
}

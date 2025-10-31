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
    avatar: string,
    address: { code: string, location: string },
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

export interface IAllFollowCategory extends ICategories {
    details: ICategoryDetail[]
}

export interface ICategories {
    _id: string,
    name: string
    description: string
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
    _id: Types.ObjectId | string,
    quantity: number,
    sold: number,
}

export interface IProduct {
    _id: string,
    name: string,
    code: string,
    description: string,
    price: number,
    discount: number,
    mainImageUrl: string,
    mainVideoUrl: string,
    isActivated: boolean,
    isDeleted: boolean,
    categoryDetail: ICategoryDetail,
    createdBy: string,
    updatedBy: string,
    deletedBy?: string,
    createdAt: Date | string,
    updatedAt: Date | string,
    deletedAt?: Date | string,
    stock: IStock,
    color: string,
    origin: string,
    height: string,
    weight: string,
    length: string,
    width: string,
}

export interface ICart {
    _id: string,
    user: IUser | string,
    product: IProduct,
    quantity: number,
    selected?: boolean
}

export interface IPayment {
    _id: string,
    method: string,
    status: string,
    transactionId: string | null,
    createdAt: string,
    updatedAt: string,
}

interface IOrderItem {
    _id: string,
    product: {
        _id: string,
        code: string,
        name: string,
        mainImageUrl: string
    },
    price: number,
    discount: number,
    quantity: number
}

export interface IOrder {
    _id: string,
    user: string,
    payment: IPayment,
    fullname: string,
    code: string,
    phone: string,
    address: { code: string, location: string },
    note: string | null,
    totalAmount: number,
    shippingFee: number,
    status: "PENDING" | "ACCEPTED" | "REJECTED",
    createdAt: string,
    updatedAt: string,
    orderItems: IOrderItem[]
}
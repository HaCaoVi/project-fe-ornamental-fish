export const ADMIN_ROLE = "ADMIN";
export const STAFF_ROLE = "STAFF";
export const CATE_FISH = "68dbf1f8a9ab2fed98a56fee";
export const CATE_FOOD = "68dbf227a9ab2fed98a56ff0";
export const CATE_ACCESSORY = "68dbf24ba9ab2fed98a56ff2"
export const cookieOptions: any = {
    httpOnly: true,
    sameSite: "strict",
    // secure: process.env.NODE_ENV === "production",
};
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_VIDEO_SIZE = 25 * 1024 * 1024; // 50MB
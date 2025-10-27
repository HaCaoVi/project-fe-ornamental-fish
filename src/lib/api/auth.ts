"use server";

import { RegisterFormData } from "@app/(client)/auth/register/page";
import { IBackendRes, ILogin, IUserLogin } from "../../types/backend";
import sendRequest from "@config/fetch.config";
import { cookies } from "next/headers";
import { ActivateAccountFormData } from "@components/features/Modal/Auth/auth-code.modal";
import { IUser } from "../../types/model";
import { ProfileFormData } from "@components/features/Profile/profile-form";
import { revalidateTag } from "next/cache";
import { PROFILE_TAG } from "@lib/constants/tag.constant";

export const getAccountAPI = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!accessToken && !refreshToken) return null;
    return sendRequest<IBackendRes<IUserLogin>>("/api/v1/auth/account", {
        method: "GET",
    });
};

export const logoutAPI = async () => {
    const cookieStore = await cookies();
    const res = await sendRequest<IBackendRes<any>>("/api/v1/auth/logout", {
        method: "POST",
    });
    if (res.statusCode === 201) {
        cookieStore.delete("refresh_token")
        cookieStore.delete("access_token")
    }
    return res;
};

export const registerAPI = async (data: Omit<RegisterFormData, "confirmPassword">) => {
    const res = await sendRequest<IBackendRes<ILogin>>("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({ ...data }),
    });
    return res;
};

export const activateAccountAPI = async (data: ActivateAccountFormData) => {
    const res = await sendRequest<IBackendRes<ILogin>>("/api/v1/auth/active-account", {
        method: "PATCH",
        body: JSON.stringify({ ...data }),
    });
    return res;
};

export const retryAccountAPI = async (email: string) => {
    const res = await sendRequest<IBackendRes<ILogin>>("/api/v1/auth/retry-active", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
    return res;
};

export const forgotPasswordAPI = async (email: string, code: string, password: string) => {
    const res = await sendRequest<IBackendRes<ILogin>>("/api/v1/auth/forgot-password", {
        method: "PATCH",
        body: JSON.stringify({ email, code, password }),
    });
    return res;
};


export const loginWithGoogleAPI = async () => {
    return sendRequest<IBackendRes<ILogin>>("/api/v1/auth/google", {
        method: "GET",
    });
};

export const viewProfileAPI = async () => {
    const res = await sendRequest<IBackendRes<IUser>>("/api/v1/auth/view-profile", {
        method: "GET",
        next: { tags: [PROFILE_TAG], revalidate: 60 * 60 },
    });
    return res;
};

export const updateProfileAPI = async (data: ProfileFormData) => {
    const res = await sendRequest<IBackendRes<any>>("/api/v1/auth/update-profile", {
        method: "PATCH",
        body: JSON.stringify({ ...data }),
    });
    if (res.statusCode === 200) {
        revalidateTag(PROFILE_TAG);
    }
    return res;
};

export const changePasswordAPI = async (oldPassword: string, newPassword: string) => {
    const res = await sendRequest<IBackendRes<any>>("/api/v1/auth/change-password", {
        method: "PATCH",
        body: JSON.stringify({ oldPassword, newPassword }),
    });
    return res;
};
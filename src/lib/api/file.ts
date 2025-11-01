"use server"

import { IBackendRes } from "../../types/backend";
import { cookies } from "next/headers";
import sendRequest from "@config/fetch.config";

export const uploadImageAPI = async (image: File) => {
    const cookieStore = await cookies();
    const url = `/api/v1/files/upload-image`;
    const oldFileName = cookieStore.get("image_upload")?.value;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("folderName", "main-image-product");
    if (oldFileName) formData.append("oldFileName", oldFileName);

    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "POST",
        body: formData,
    });

    if (res.statusCode === 201 && res.data) {
        cookieStore.set("image_upload", res.data.fileName, { httpOnly: true }
        );
    }
    return res;
};

export const uploadVideoAPI = async (image: File) => {
    const cookieStore = await cookies();
    const url = `/api/v1/files/upload-video`;
    const oldFileName = cookieStore.get("video_upload")?.value;

    const formData = new FormData();
    formData.append("video", image);
    formData.append("folderName", "main-video-product");
    if (oldFileName) formData.append("oldFileName", oldFileName);

    const res = await sendRequest<IBackendRes<any>>(url, {
        method: "POST",
        body: formData,
    });

    if (res.statusCode === 201 && res.data) {
        cookieStore.set("video_upload", res.data.fileName, { httpOnly: true });
    }
    return res;
};

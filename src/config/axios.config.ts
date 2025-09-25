"use server"
import { refreshTokenAPI } from "@lib/api/auth";
import { Mutex } from "async-mutex";
import axiosClient from "axios";
import { cookies } from "next/headers";

/**
 * Creates an initial 'axios' instance with custom settings.
 */

const instance = axiosClient.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true
});

const mutex = new Mutex();
const NO_RETRY_HEADER = 'x-no-retry';

const handleRefreshToken = async (): Promise<string | null> => {
    const cookieStore = await cookies()
    return await mutex.runExclusive(async () => {
        const res = await refreshTokenAPI()
        if (res && res.data) {
            cookieStore.set("access_token", res.data.access_token);
            return res.data.access_token;
        }
        else return null;
    });
};

instance.interceptors.request.use(async (config) => {
    const cookieStore = await cookies()

    const accessToken = cookieStore.get("access_token")?.value
    if (accessToken) {
        config.headers.Authorization = 'Bearer ' + accessToken;
    }
    if (!config.headers.Accept && config.headers["Content-Type"]) {
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
});

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
    (res) => res.data,
    async (error) => {
        if (
            error.config
            && error.response
            && +error.response.status === 401
            && error.config.url !== '/api/v1/auth/login'
            && !error.config.headers[NO_RETRY_HEADER]
        ) {
            const access_token = await handleRefreshToken();
            error.config.headers[NO_RETRY_HEADER] = 'true'
            if (access_token) {
                error.config.headers['Authorization'] = `Bearer ${access_token}`;
                return instance.request(error.config);
            }
        }

        if (
            error.config
            && error.response
            && +error.response.status === 400
            && error.config.url === '/api/v1/auth/refresh-token'
        ) {
            const message = error?.response?.data?.message ?? "Your session has expired. Please log in again.";
            // setRefreshTokenAction(true, message)

        }

        return error?.response?.data ?? Promise.reject(error);
    }
);

/**
 * Replaces main `axios` instance with the custom-one.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
// const axiosConfig = <T>(cfg: AxiosRequestConfig) => instance.request<any, T>(cfg);

// export default axiosConfig;

export default instance;


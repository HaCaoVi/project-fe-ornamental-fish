/**
 * Get cookie value by name
 */
export const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
};

/**
 * Set cookie
 * @param name - cookie key
 * @param value - cookie value
 * @param days - expired days (optional)
 * @param path - path (default "/")
 */
export const setCookie = (
    name: string,
    value: string,
    days?: number,
    path: string = "/"
) => {
    if (typeof document === "undefined") return;
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        expires +
        "; path=" +
        path;
};

/**
 * Delete cookie
 */
export const deleteCookie = (name: string, path: string = "/") => {
    if (typeof document === "undefined") return;
    document.cookie =
        name +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" +
        path;
};
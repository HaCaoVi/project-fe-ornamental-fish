// utils/notify.ts
import { toast } from "sonner";

export const notify = {
    success: (message: string) =>
        toast.success(message, {
            style: {
                background: "white",
                color: "#16a34a",
            },
        }),

    error: (message: string) =>
        toast.error(message, {
            style: {
                background: "white",
                color: "#dc2626",
            },
        }),

    warning: (message: string) =>
        toast.warning(message, {
            style: {
                background: "white",
                color: "#facc15",
            },
        }),

    info: (message: string) =>
        toast.info(message, {
            style: {
                background: "white",
                color: "#0284c7",
            },
        }),
};

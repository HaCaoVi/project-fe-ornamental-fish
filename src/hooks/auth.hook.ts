import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";

export const refreshTokenActionHook = (message: string) => {
    const { setRefreshTokenAction } = useContext(AuthContext)!;

    // gọi y hệt Redux dispatch
    setRefreshTokenAction(true, message);
};

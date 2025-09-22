import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";

export const refreshTokenActionHook = (message: string) => {
    const { setRefreshTokenAction } = useContext(AuthContext)!;
    setRefreshTokenAction(true, message);
};

export const useAuthContext = () => useContext(AuthContext);
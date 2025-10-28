import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login Page",
};

const LoginLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>{children}</>
    );
}
export default LoginLayout;
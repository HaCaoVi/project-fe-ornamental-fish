import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login Google Page",
};

const LoginWithGoogleLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>{children}</>
    );
}
export default LoginWithGoogleLayout;
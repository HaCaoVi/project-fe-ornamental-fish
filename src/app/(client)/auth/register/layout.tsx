import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register Page",
};

const RegisterLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>{children}</>
    );
}
export default RegisterLayout;
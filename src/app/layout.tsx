import type { Metadata } from "next";
import "@styles/globals.css";
import { AuthProvider } from "@contexts/auth.context";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Home Page",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          {children}
          <Toaster position="top-center" />
        </body>
      </html>
    </AuthProvider>
  );
}
export default RootLayout;
import type { Metadata } from "next";
import "@styles/globals.css";
import { AuthProvider } from "@contexts/auth.context";
import { Toaster } from "sonner";
import { AppProvider } from "@contexts/app.context";

export const metadata: Metadata = {
  title: "Home Page",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AppProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            {children}
            <Toaster position="top-center" />
          </body>
        </html>
      </AuthProvider>
    </AppProvider>
  );
}
export default RootLayout;
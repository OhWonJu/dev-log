import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import { kenwave, libre_barcode_39, pacifico } from "@/styles/font";

import { checkAdmin } from "@/lib/checkAdmin";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";

import { cn } from "@/lib/utils";
import { Navigator } from "@/components";
import ModalProvider from "@/components/providers/ModalProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { SocketProvider } from "@/components/providers/SocketProvider";
import NavProvider from "@/components/providers/NavProvider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe",
  description: "Portfolio & Dev recipe",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await checkAdmin();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          font.className,
          pacifico.variable,
          libre_barcode_39.variable,
          kenwave.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="recipe-theme"
        >
          <SocketProvider>
            <AuthProvider isAdmin={isAdmin}>
              <QueryProvider>
                <div
                  className="bg-background text-primary min-h-screen"
                  style={{ backgroundImage: "var(--background-image)" }}
                >
                  <ModalProvider />
                  <NavProvider>
                    <Navigator />
                    {children}
                  </NavProvider>
                </div>
              </QueryProvider>
            </AuthProvider>
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import { kenwave, libre_barcode_39, pacifico } from "@/styles/font";

import { cn } from "@/lib/utils";
import { checkAdmin } from "@/lib/checkAdmin";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import ModalProvider from "@/components/providers/ModalProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import NavProvider from "@/components/providers/NavProvider";
import { GTM, Navigator, ChatListButton } from "@/components";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL!}`),
  title: "Recipe",
  description: "Portfolio & Dev recipe",
  icons: {
    icon: { url: "/favicon.svg", href: "/favicon.svg" },
  },
  openGraph: {
    title: "Recipe",
    url: `${process.env.NEXT_PUBLIC_SITE_URL!}`,
    description: "Portfolio & Dev recipe",
    locale: "ko-KR",
    type: "profile",
    images: ["/recipe.svg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await checkAdmin();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn(
          font.className,
          pacifico.variable,
          libre_barcode_39.variable,
          kenwave.variable
        )}
      >
        <GTM />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="recipe-theme"
        >
          <AuthProvider isAdmin={isAdmin}>
            <QueryProvider>
              <div
                className="relative bg-background text-primary min-h-screen max-w-screen transition-colors"
                style={{ backgroundImage: "var(--background-image)" }}
              >
                <ModalProvider />
                <NavProvider>
                  <Navigator />
                  {children}
                  <ChatListButton />
                </NavProvider>
              </div>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

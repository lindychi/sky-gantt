import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import AuthGuard, { AuthProvider } from "@/components/Auth/AuthGuard";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import LNBWrapper from "@/components/LNBWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "스카이간트",
  description: "맞춤형 간트 차트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AuthProvider>
            <AuthGuard>
              <div className="flex flex-col">
                <Header />
                <Separator orientation="horizontal" />
                <div className="flex h-[calc(100vh-64px)]">
                  <div className="min-h-full min-w-[250px] p-6">
                    <LNBWrapper />
                  </div>
                  <Separator orientation="vertical" />
                  <div className="flex flex-col min-w-[calc(100vw-250px)]">
                    {children}
                  </div>
                </div>
              </div>
            </AuthGuard>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

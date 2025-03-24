"use client";
import Providers from "@/components/Providers";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastContainer } from "react-toastify";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideHeader = pathname === "/login" || pathname === "/register";
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
           {!hideHeader && <Header />}
          {children}
          <ToastContainer position="top-right" autoClose={3000}/>
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

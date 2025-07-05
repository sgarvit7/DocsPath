import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import { Inter } from "next/font/google";
import CookieConsentBanner from "@/components/CookieConsentBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Docspath",
  description: "Health Care management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <StoreProvider>
          <CssBaseline />
          <AuthProvider>{children}</AuthProvider>
          <CookieConsentBanner />
        </StoreProvider>
      </body>
    </html>
  );
}

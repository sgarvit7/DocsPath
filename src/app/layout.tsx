import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Medmin",
  description: "Health Care management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950" >
        {children}
      </body>
    </html>
  );
}

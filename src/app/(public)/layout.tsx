import Layout from "@/components/publicPageComponents/Layout";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}
  </Layout>;
}

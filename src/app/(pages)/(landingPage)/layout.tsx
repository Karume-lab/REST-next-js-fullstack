import { Header } from "@/components";
import { SharedLayout } from "@/layouts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SharedLayout>
      <Header />
      {children}
    </SharedLayout>
  );
}

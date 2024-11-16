import { defaultMetadata } from "@/config/metadata";
import ReactQueryProvider from "@/providers/ReactQueryProvier";
import { Toaster } from "sonner";
import "@/styles/globals.css";
import { SharedLayout } from "@/layouts";

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SharedLayout>
      <ReactQueryProvider>
        {children}
        <Toaster richColors />
      </ReactQueryProvider>
    </SharedLayout>
  );
}

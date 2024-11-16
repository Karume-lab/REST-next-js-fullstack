import { defaultMetadata } from "@/config/metadata";
import "@/styles/globals.css";
import { geistSans, geistMono } from "@/config/fonts";
import { BaseProviders } from "@/components";

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <BaseProviders>{children}</BaseProviders>
      </body>
    </html>
  );
}

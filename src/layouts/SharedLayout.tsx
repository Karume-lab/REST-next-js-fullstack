import { PropsWithChildren } from "react";
import { geistSans, geistMono } from "@/config/fonts";
import { Metadata } from "next";

interface SharedLayoutProps extends PropsWithChildren {
  className?: string;
}

export function SharedLayout({ children, className = "" }: SharedLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${className}`}
      >
        {children}
      </body>
    </html>
  );
}

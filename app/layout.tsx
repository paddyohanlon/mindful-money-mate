"use client";

import "./globals.css";
import dynamic from "next/dynamic";

const LoadData = dynamic(() => import("@/app/components/LoadData"), {
  ssr: false,
});
const NavBar = dynamic(() => import("@/app/components/NavBar"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="forest">
      <body className="text-white">
        <LoadData />
        <NavBar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}

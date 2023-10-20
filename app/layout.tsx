"use client";

import "./globals.css";
import NavBar from "./NavBar";
import IsLoggedInProvider from "./IsLoggedInProvider";
import dynamic from "next/dynamic";

const HandleOnLogin = dynamic(() => import("./components/HandleOnLogin"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="coffee">
      <body className="text-white">
        <IsLoggedInProvider>
          <HandleOnLogin />
          <NavBar />
          <main className="p-4">{children}</main>
        </IsLoggedInProvider>
      </body>
    </html>
  );
}

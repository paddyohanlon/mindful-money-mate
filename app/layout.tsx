"use client";

import "./globals.css";
import NavBar from "./NavBar";
import dynamic from "next/dynamic";

const IsLoggedInProvider = dynamic(() => import("./IsLoggedInProvider"), {
  ssr: false,
});
const BudgetsProvider = dynamic(() => import("./BudgetsProvider"), {
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
          <BudgetsProvider>
            <NavBar />
            <main className="p-4">{children}</main>
          </BudgetsProvider>
        </IsLoggedInProvider>
      </body>
    </html>
  );
}

"use client";

import "./globals.css";
import dynamic from "next/dynamic";

const OnLogin = dynamic(() => import("@/app/OnLogin"), {
  ssr: false,
});
const RedirectIfNotLoggedIn = dynamic(
  () => import("@/app/RedirectIfNotLoggedIn"),
  {
    ssr: false,
  }
);
const NavBar = dynamic(() => import("@/app/components/NavBar"), {
  ssr: false,
});
const Loader = dynamic(() => import("@/app/components/Loader"), {
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
        <OnLogin />
        <RedirectIfNotLoggedIn />
        <NavBar />

        <Loader>
          <main>{children}</main>
        </Loader>
      </body>
    </html>
  );
}

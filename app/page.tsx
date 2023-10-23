"use client";

import dynamic from "next/dynamic";

const PageClientContent = dynamic(() => import("@/app/PageClientContent"), {
  ssr: false,
});

export default function Home() {
  return <PageClientContent />;
}

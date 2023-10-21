"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import IsLoggedInContext from "@/app/contexts/isLoggedInContext";

export default function Home() {
  const { isLoggedIn } = useContext(IsLoggedInContext);

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/budgets");
    }
  }, [router, isLoggedIn]);

  return (
    <>
      <div className="prose">
        {!isLoggedIn ? <p>Sign up or sign in to get started.</p> : <div></div>}
      </div>
    </>
  );
}

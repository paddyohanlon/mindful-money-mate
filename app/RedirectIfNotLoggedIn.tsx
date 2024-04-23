import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { bzr } from "./services/bzr";

const RedirectIfNotLoggedIn = () => {
  const router = useRouter();

  useEffect(() => {
    if (!bzr.isLoggedIn()) {
      console.log("not logged in, redirect to /");
      router.push("/");
    }
  }, [router]);

  return null;
};

export default RedirectIfNotLoggedIn;

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { rid } from "./services/rethinkid";

const RedirectIfNotLoggedIn = () => {
  const router = useRouter();

  useEffect(() => {
    if (!rid.isLoggedIn()) {
      console.log("not logged in, redirect to /");
      router.push("/");
    }
  }, [router]);

  return null;
};

export default RedirectIfNotLoggedIn;

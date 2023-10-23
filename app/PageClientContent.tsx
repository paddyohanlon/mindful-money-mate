import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAppStore from "@/app/store";
import { BUDGETS_PATH } from "./constants";

const PageClientContent = () => {
  const { isLoggedIn } = useAppStore();

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push(BUDGETS_PATH);
    }
  }, [router, isLoggedIn]);

  return (
    <div className="prose">
      {!isLoggedIn ? <p>Sign up or sign in to get started.</p> : <div></div>}
    </div>
  );
};

export default PageClientContent;

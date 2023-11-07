"use client";

import Link from "next/link";
import ActiveBudgetLink from "./ActiveBudgetLink";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import useAppStore from "../store";
import { BUDGETS_PATH } from "../constants";
import dynamic from "next/dynamic";
import PopulateDataButton from "./PopulateDataButton";

const StartFreshButton = dynamic(
  () => import("@/app/components/StartFreshButton"),
  {
    ssr: false,
  }
);

const NavBar = () => {
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  const handleDetailsClick = (event: React.MouseEvent<HTMLDetailsElement>) => {
    const detailsElement = event.currentTarget;
    const targetElement = event.target as HTMLElement;

    // Check if the clicked element is not the <summary> element
    if (targetElement.tagName !== "SUMMARY") {
      detailsElement.removeAttribute("open");
    }
  };

  return (
    <div className="navbar bg-neutral text-neutral-content z-10 relative">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          Logo
        </Link>
      </div>
      <div className="flex-none">
        {isLoggedIn ? (
          <ul className="menu menu-horizontal px-1">
            <li>
              <ActiveBudgetLink />
            </li>
            <li>
              <details id="account-details" onClick={handleDetailsClick}>
                <summary>Menu</summary>
                <ul className="p-2 bg-base-100 right-0 min-w-max [&>li]:mb-2 [&_.btn]:content-center">
                  <li>
                    <Link href={BUDGETS_PATH}>Budgets</Link>
                  </li>
                  <li className="pb-4">
                    <SignOutButton />
                  </li>
                  <li>
                    <PopulateDataButton />
                  </li>
                  <li>
                    <StartFreshButton />
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        ) : (
          <ul className="menu menu-horizontal px-1">
            <li>
              <SignInButton />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;

"use client";

import Link from "next/link";
import React, { useContext } from "react";
import IsLoggedInContext from "./contexts/isLoggedInContext";
import dynamic from "next/dynamic";
import ActiveBudgetLink from "./components/ActiveBudgetLink";

const SignOutButton = dynamic(() => import("./components/SignOutButton"), {
  ssr: false,
});
const SignInButton = dynamic(() => import("./components/SignInButton"), {
  ssr: false,
});

const NavBar = () => {
  const { isLoggedIn } = useContext(IsLoggedInContext);

  return (
    <div className="navbar bg-neutral text-neutral-content">
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
              <details>
                <summary>Account</summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <Link href="/budgets">Budgets</Link>
                  </li>
                  <li>
                    <SignOutButton />
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

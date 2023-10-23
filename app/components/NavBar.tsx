"use client";

import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import ActiveBudgetLink from "./ActiveBudgetLink";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import useAppStore from "../store";
import { BUDGETS_PATH } from "../constants";

// const SignOutButton = dynamic(() => import("./SignOutButton"), {
//   ssr: false,
// });
// const SignInButton = dynamic(() => import("./SignInButton"), {
//   ssr: false,
// });

const NavBar = () => {
  const { isLoggedIn } = useAppStore();

  return (
    <div className="navbar bg-neutral text-neutral-content mb-8">
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
                    <Link href={BUDGETS_PATH}>Budgets</Link>
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

"use client";

import Link from "next/link";
import React, { useContext } from "react";
import IsLoggedInContext from "./contexts/isLoggedInContext";
import dynamic from "next/dynamic";

const SignOutButton = dynamic(() => import("./components/SignOutButton"), {
  ssr: false,
});
const SignInButton = dynamic(() => import("./components/SignInButton"), {
  ssr: false,
});

const NavBar = () => {
  const { isLoggedIn } = useContext(IsLoggedInContext);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          Logo
        </Link>
      </div>
      <div className="flex-none">
        {isLoggedIn ? (
          <ul className="menu menu-horizontal px-1">
            <li>
              <SignOutButton />
            </li>
            <li>
              <Link href="/budgets">Budgets</Link>
            </li>
            <li>
              <details>
                <summary>Account</summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
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

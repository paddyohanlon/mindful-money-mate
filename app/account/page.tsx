"use client";

import React from "react";
import { ContainerSmall } from "../components/ContainerSmall";
import useAppStore from "../store";

const AccountPage = () => {
  const user = useAppStore((state) => state.user);

  return (
    <>
      <ContainerSmall>
        <div className="prose pb-8">
          <h1>Account</h1>
          <ul>
            <li>
              <span>User ID: {user.id}</span>
            </li>
            <li>
              <span>Name: {user.name}</span>
            </li>
            <li>
              <span>Email: {user.email}</span>
            </li>
          </ul>
        </div>
      </ContainerSmall>
    </>
  );
};

export default AccountPage;

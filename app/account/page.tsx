"use client";

import React from "react";
import { ContainerSmall } from "../components/ContainerSmall";
import dynamic from "next/dynamic";

const AccountDetail = dynamic(() => import("./AccountDetail"), {
  ssr: false,
});

const AccountPage = () => {
  return (
    <>
      <ContainerSmall>
        <AccountDetail />
      </ContainerSmall>
    </>
  );
};

export default AccountPage;

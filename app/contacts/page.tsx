"use client";

import dynamic from "next/dynamic";

const SocialModalButton = dynamic(
  () => import("@/app/components/SocialModalButton"),
  {
    ssr: false,
  }
);
const ContactsList = dynamic(() => import("./ContactsList"), {
  ssr: false,
});

const ContactsPage = () => {
  return (
    <>
      <div className="flex justify-between items-baseline gap-4 px-6 py-2">
        <h1 className="text-2xl">Contacts</h1>
        <SocialModalButton />
      </div>
      <ContactsList />
    </>
  );
};

export default ContactsPage;

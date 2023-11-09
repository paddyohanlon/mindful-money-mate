"use client";

import dynamic from "next/dynamic";
import useAppStore from "../store";

const ContactRow = dynamic(() => import("./ContactRow"), {
  ssr: false,
});

const ContactsList = () => {
  const contacts = useAppStore((state) => state.contacts);
  return (
    <div>
      <ul>
        {contacts.map((contact) => (
          <ContactRow key={contact.id} contact={contact} />
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;

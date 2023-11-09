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
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Connected</th>
            <th>Requested</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <ContactRow key={contact.id} contact={contact} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsList;

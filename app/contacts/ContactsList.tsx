"use client";

import dynamic from "next/dynamic";
import useAppStore from "../store";

const ContactRow = dynamic(() => import("./ContactRow"), {
  ssr: false,
});
const SocialModalButton = dynamic(
  () => import("@/app/components/SocialModalButton"),
  {
    ssr: false,
  }
);

const ContactsList = () => {
  const contacts = useAppStore((state) => state.contacts);
  return (
    <>
      {contacts.length === 0 ? (
        <div className="prose px-6">
          <p>Add your first contact.</p>
          <SocialModalButton />
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
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
      )}
    </>
  );
};

export default ContactsList;

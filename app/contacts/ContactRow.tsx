import { rid } from "../services/rethinkid";
import { useEffect, useState } from "react";
import { User, Contact } from "@rethinkid/rethinkid-js-sdk";

interface Props {
  contact: Contact;
}

const ContactRow = ({ contact }: Props) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    rid.social.getUser(contact.contactUserId).then((user) => {
      setUser(user);
    });
  }, [contact.contactUserId]);

  return (
    <tr key={contact.id}>
      <td>{user?.name}</td>
      <td>{user?.email}</td>
      <td>{contact.connected ? "Yes" : "No"}</td>
      <td>{contact.requested ? "Yes" : "No"}</td>
    </tr>
  );
};

export default ContactRow;

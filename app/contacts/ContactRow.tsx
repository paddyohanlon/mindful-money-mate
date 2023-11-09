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

  // Do contacts table, then do social
  return <li key={contact.id}>{user?.email}</li>;
};

export default ContactRow;

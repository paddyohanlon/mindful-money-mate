import { Contact } from "@rethinkid/rethinkid-js-sdk";

interface Props {
  contact: Contact;
}

const ContactRow = ({ contact }: Props) => {
  return (
    <tr key={contact.id}>
      <td>{contact.user?.id}</td>
      <td>{contact.user?.name}</td>
      <td>{contact.user?.email}</td>
      <td>{contact.connected ? "Yes" : "No"}</td>
    </tr>
  );
};

export default ContactRow;

import { rid } from "../services/rethinkid";

const SocialModalButton = () => {
  function handleClick() {
    rid.social.openModal((userId: string) => {
      console.log("User ID from modal!", userId);
    });
  }
  return (
    <button className="btn btn-sm btn-neutral" onClick={handleClick}>
      Manage Contacts
    </button>
  );
};

export default SocialModalButton;

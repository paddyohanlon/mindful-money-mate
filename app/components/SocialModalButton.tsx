import { rid } from "../services/rethinkid";

const SocialModalButton = () => {
  function handleClick() {
    rid.social.openModal();
  }
  return (
    <button className="btn btn-sm btn-neutral" onClick={handleClick}>
      Manage Contacts
    </button>
  );
};

export default SocialModalButton;

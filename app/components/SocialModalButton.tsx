import { rid } from "../services/rethinkid";

const SocialModalButton = () => {
  function openSocialModal() {
    rid.social.openModal();
  }
  return (
    <button className="btn btn-sm btn-neutral" onClick={openSocialModal}>
      Manage Contacts
    </button>
  );
};

export default SocialModalButton;

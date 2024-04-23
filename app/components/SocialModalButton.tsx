import { bzr } from "../services/bzr";

const SocialModalButton = () => {
  function handleClick() {
    bzr.social.openModal((userId: string) => {
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

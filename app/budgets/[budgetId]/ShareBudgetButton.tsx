import { rid } from "@/app/services/rethinkid";

interface Props {
  budgetId: string;
}

const ShareBudgetButton = ({ budgetId }: Props) => {
  function handleClick() {
    // rid.permissions.granted.subscribe()
    // Share!
  }

  return (
    <button
      className="btn btn-sm btn-neutral btn-outline"
      onClick={handleClick}
    >
      Share
    </button>
  );
};

export default ShareBudgetButton;

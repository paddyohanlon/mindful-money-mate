import useAppStore from "../store";

const PopulateDataButton = () => {
  const populateSampleData = useAppStore((state) => state.populateSampleData);

  function handleClick() {
    if (!window.confirm("Are you sure you want to populate sample data?"))
      return;
    populateSampleData();
  }

  return (
    <button
      className="btn btn-sm btn-outline btn-neutral"
      onClick={handleClick}
    >
      Populate Sample Data
    </button>
  );
};

export default PopulateDataButton;

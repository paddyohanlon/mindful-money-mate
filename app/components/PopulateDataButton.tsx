import useAppStore from "../store";

const PopulateDataButton = () => {
  const { populateSampleData } = useAppStore();

  function handleClick() {
    if (!window.confirm("Are you sure you want to populate sample data?"))
      return;
    populateSampleData();
  }

  return (
    <button className="btn btn-neutral" onClick={handleClick}>
      Populate Data
    </button>
  );
};

export default PopulateDataButton;

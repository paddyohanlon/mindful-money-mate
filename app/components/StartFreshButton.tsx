import useAppStore from "../store";

const StartFreshButton = () => {
  const { startFresh } = useAppStore();

  function handleClick() {
    if (!window.confirm("Are you sure you want to delete all of your data?"))
      return;
    startFresh();
  }

  return (
    <button className="btn btn-error" onClick={handleClick}>
      Start Fresh
    </button>
  );
};

export default StartFreshButton;

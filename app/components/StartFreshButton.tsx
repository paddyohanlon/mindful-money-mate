import useAppStore from "../store";

const StartFreshButton = () => {
  const startFresh = useAppStore((state) => state.startFresh);

  function handleClick() {
    if (!window.confirm("Are you sure you want to delete all of your data?"))
      return;
    startFresh();
  }

  return (
    <button className="btn btn-sm btn-error btn-outline" onClick={handleClick}>
      Start Fresh
    </button>
  );
};

export default StartFreshButton;

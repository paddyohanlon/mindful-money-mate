import { useEffect } from "react";
import useAppStore from "../store";

const LoadData = () => {
  const { load } = useAppStore();

  useEffect(() => {
    console.log("load data");
    load();
  }, [load]);

  return null;
};

export default LoadData;

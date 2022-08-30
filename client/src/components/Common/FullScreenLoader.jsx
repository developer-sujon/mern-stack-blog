//External LibImport
import { useSelector } from "react-redux";

const FullScreenLoader = () => {
  const { isLoading } = useSelector((state) => state.loader);

  return (
    <div className={isLoading ? "loading__overlay" : "hidden"}>
      <div className="indeterminate"></div>
    </div>
  );
};

export default FullScreenLoader;

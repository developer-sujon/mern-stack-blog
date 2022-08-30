//External LibImport
import { useSelector } from "react-redux";

const FullScreenLoader = () => {
  const loader = useSelector((state) => state.setting.isLoading);

  return (
    <div className={loader ? "loading" : "d-none"}>
      <div className="loading__line__progress">
        <div className="loading__line__progress__indeterminate"></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;

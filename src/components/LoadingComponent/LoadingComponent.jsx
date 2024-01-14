import { ClipLoader } from "react-spinners";
import "./LoadingComponent.css";

const LoadingComponent = () => {
  return (
    <div className="loading-component">
      <ClipLoader color="var(--button-color)" size={100} />
    </div>
  );
};

export default LoadingComponent;

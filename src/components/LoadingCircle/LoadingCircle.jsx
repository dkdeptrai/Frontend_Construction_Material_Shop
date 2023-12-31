import { ClipLoader } from "react-spinners";
import "./LoadingCircle.css";

const LoadingCircle = () => {
  return (
    <div className="blur-background">
      <ClipLoader color="var(--button-color)" size={100} />
    </div>
  );
};

export default LoadingCircle;

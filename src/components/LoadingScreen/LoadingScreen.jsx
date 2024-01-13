import { ClipLoader } from "react-spinners";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="blur-background">
      <ClipLoader color="var(--button-color)" size={100} />
    </div>
  );
};

export default LoadingScreen;

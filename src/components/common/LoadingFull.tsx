import Lottie from "lottie-react";
import Lottieloading from "../../assets/lottie/loading.json";

const LoadingFull = () => {
  return (
    <div className="full-height flex flex-col items-center justify-center pb-36">
      <Lottie animationData={Lottieloading} />
      <p className="text-xl font-semibold text-orange-500 -mt-10">
        TIFY가 열심히 찾아보고 있어요 ..
      </p>
    </div>
  );
};
export default LoadingFull;

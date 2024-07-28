import { Link } from "react-router-dom";
import prepare from "../assets/images/sad.svg";

const PreparingPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center pb-28">
      <img src={prepare} alt="준비중" />
      <div className="flex-center flex-col pt-6 gap-4">
        <span className="text-xl font-semibold">서비스 준비중이에요.</span>
        <span className="text-gray-500 text-sm">조금만 기다려주세요.</span>
      </div>
      <Link
        to="/"
        className="min-w-fit bg-black text-white px-7 py-5 rounded-lg mt-14"
      >
        홈으로 가기
      </Link>
    </div>
  );
};

export default PreparingPage;

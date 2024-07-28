import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Lottie from "lottie-react";
import home from "../assets/lottie/home.json";
import TopHeartSection from "../components/TopHeartSection";

const Index = () => {
  return (
    <>
      <Header />
      <div className="px-5">
        <div className="flex flex-col items-center mb-9">
          <h1 className="text-center text-2xl font-semibold leading-9 mt-10 mb-6">
            1분 만에 고르는
            <br />
            당신에게 딱 맞는 선물
          </h1>
          <Link
            to="/voice"
            className="flex-center w-[158px] h-14 bg-black text-white rounded-lg"
          >
            선물 고르러 가기
          </Link>
          <Lottie className="w-[240px] h-[240px] mt-3" animationData={home} />
        </div>
        <TopHeartSection />
      </div>
    </>
  );
};

export default Index;

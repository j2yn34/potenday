import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Lottie from "lottie-react";
import home from "../assets/lottie/home.json";
import ProductSection from "../components/ProductSection";
import icon from "../assets/images/tabIcon.png";
import { BsChevronDown } from "react-icons/bs";

const Index = () => {
  const handleScroll = () => {
    window.scrollBy({ top: 550, left: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      <div className="home-bg">
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
            <button onClick={handleScroll} className="relative w-full">
              <BsChevronDown
                size={32}
                className="text-gray-500 absolute top-[-12px] left-[46.5%]"
              />
            </button>
          </div>
          <div className="flex-center flex-col py-12">
            <img src={icon} className="w-[32px] mb-[10px]" />
            <h1 className="text-[22px] font-semibold leading-9 mb-2">
              T!FY의 인기선물
            </h1>
            <span className="text-gray-500 text-sm">
              많은 사람들이 찜한 인기 선물을 구경해보세요!
            </span>
          </div>
          <ProductSection />
        </div>
      </div>
    </div>
  );
};

export default Index;

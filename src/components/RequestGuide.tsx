import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import LottieWho from "../assets/lottie/who.json";
import { IoChevronBackSharp } from "react-icons/io5";
import bubble from "../assets/images/bubble.png";

const RequestGuide = () => {
  return (
    <>
      <div className="absolute z-40 pt-8 -ml-1">
        <Link to="/">
          <IoChevronBackSharp size={24} />
        </Link>
      </div>
      <div className="pt-8">
        <div className="w-full flex justify-center -mb-4">
          <Lottie className="w-[120px] h-[120px]" animationData={LottieWho} />
        </div>
        <h1 className="text-center font-semibold text-xl leading-8">
          누구에게 <br />
          어떤 선물을 하고 싶나요?
        </h1>
        <div className="relative flex-center pt-3.5">
          <img src={bubble} className="absolute top-[4px] w-[14px] h-[17px]" />
          <div className="flex-center w-[296px] h-7 bg-white border rounded-full border-orange-200">
            <span className="text-sm text-orange-500">
              아래의 버튼을 누르고 자유롭게 이야기해 주세요.
            </span>
          </div>
        </div>
      </div>
      <div className="flex-center mb-15 h-full text-center font-semibold text-xl text-purple-100 leading-8">
        어떤 관계인지
        <br /> 나이는 어떻게 되는지 <br />
        선물의 가격대 <br />
        평소 좋아하는 스타일은 어떤지
        <br />
        말해 보세요
      </div>
    </>
  );
};

export default RequestGuide;

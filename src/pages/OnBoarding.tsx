import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import onboarding1 from "../assets/images/onboarding1.svg";
import onboarding2 from "../assets/images/onboarding2.svg";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/");
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    {
      image: `${onboarding1}`,
      title: "대화하듯 쉽게 고르는\n맞춤형 선물",
      description: "TIFY가 당신에게 딱 맞는 선물을 골라줄 거예요.",
    },
    {
      image: `${onboarding2}`,
      title: "클릭 한 번으로 연결되는\n다양한 상품 링크",
      description: "다양한 선물에 대한 상품 링크를 제공해드려요.",
    },
  ];

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      if (currentIndex < slides.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    if (touchStartX.current - touchEndX.current < -50) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="h-screen px-5 flex flex-col justify-between py-8">
      <div className="flex-center flex-col pt-6">
        <h1 className="text-2xl leading-9 font-semibold text-center pb-4">
          {slides[currentIndex].title.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </h1>
        <span className="text-gray-500 text-sm font-medium">
          {slides[currentIndex].description}
        </span>
      </div>
      <div className="relative flex flex-col items-center">
        <div
          className="flex overflow-hidden w-[320px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 mt-12"
            style={{ transform: `translateX(-${currentIndex * 320}px)` }}
          >
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-[320px] flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-center flex-col gap-6">
        <div className="flex mt-16 space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-black w-5 h-2"
                  : "bg-gray-400 w-2.5 h-2"
              }`}
            />
          ))}
        </div>
        <button
          className="w-full h-14 bg-black text-white rounded-lg"
          onClick={handleStart}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default Onboarding;

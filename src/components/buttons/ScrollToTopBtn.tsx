import { useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";

const ScrollToTopButton = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [buttonRightPosition, setButtonRightPosition] = useState("24px");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      setShowScrollTopButton(window.scrollY > 470);
    };

    const updateButtonPosition = () => {
      const screenWidth = window.innerWidth;
      const buttonRight =
        screenWidth > 480 ? `calc(24px + (50% - 240px))` : "24px";
      setButtonRightPosition(buttonRight);
    };

    window.addEventListener("scroll", handleScrollEvent);
    window.addEventListener("resize", updateButtonPosition);

    updateButtonPosition();

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      window.removeEventListener("resize", updateButtonPosition);
    };
  }, []);

  if (!showScrollTopButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed z-40 bottom-9 p-3 bg-white text-gray-800 rounded-full shadow-[0_2px_6px_3px_rgba(0,0,0,0.1)]"
      style={{ right: buttonRightPosition }}
      aria-label="화면 최상단으로 스크롤 이동"
    >
      <BsArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;

import { IoChevronBackSharp } from "react-icons/io5";

const TitleHeader = ({
  goBack,
  pageTitle,
}: {
  goBack: () => void;
  pageTitle: string;
}) => {
  return (
    <div className="sticky top-0 z-50 w-full max-w-[480px] bg-purple-50">
      <div className="flex items-center justify-between py-8">
        <button
          onClick={goBack}
          className="flex items-center h-[28px]"
          aria-label="뒤로가기"
        >
          <IoChevronBackSharp size={24} />
        </button>
        <h1 className="text-center font-semibold text-xl">{pageTitle}</h1>
        <div className="w-6"></div>
      </div>
    </div>
  );
};

export default TitleHeader;

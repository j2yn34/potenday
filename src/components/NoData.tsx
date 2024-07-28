import prepare from "../assets/images/prepare.svg";

const NoData = () => {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center pb-28">
        <img src={prepare} alt="데이터 없음" />
        <div className="flex-center flex-col pt-6 gap-4">
          <span className="text-xl font-semibold">
            딱 맞는 선물을 찾지 못했어요.
          </span>
          <span className="text-gray-500 text-sm">
            다음엔 티피가 더 좋은 상품을 가져올게요.
          </span>
        </div>
      </div>
    </>
  );
};

export default NoData;

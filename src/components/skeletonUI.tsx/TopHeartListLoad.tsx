const TopHeartListLoad = () => {
  return (
    <>
      <div className="max-w-fit bg-orange-50 rounded text-xs text-orange-500 px-2.5 py-1 whitespace-nowrap">
        티피의 인기 선물
      </div>
      <div className="pb-14 animate-pulse">
        <div className="w-[70px] h-[24px] rounded bg-gray-300 mt-3 mb-4 text-xl font-semibold"></div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 items-start">
          {Array.from(Array(4)).map((_, index) => (
            <button className="w-full h-48 card" key={index}>
              <div className="w-full h-36 rounded-lg bg-gray-300" />
              <div className="w-full h-12 mt-2 text-start">
                <div className="w-full h-4 mt-2 bg-gray-300"></div>
                <div className="w-full h-4 mt-2 bg-gray-300"></div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopHeartListLoad;

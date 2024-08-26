const MyHeartListLoad = () => {
  return (
    <div className="relative w-full full-height overflow-hidden mx-auto max-w-screen-lg bg-purple-50">
      <div className="pb-3 flex gap-5 animate-pulse">
        <div className="w-[40px] h-5 bg-gray-300 rounded-sm"></div>
        <div className="w-[50px] h-5 bg-gray-300 rounded-sm"></div>
        <div className="w-[50px] h-5 bg-gray-300 rounded-sm"></div>
        <div className="w-[50px] h-5 bg-gray-300 rounded-sm"></div>
      </div>
      <div className="w-[calc(100%+40px)] -ml-5 h-[6px] bg-[#E7E5F2] my-2" />
      <div className="flex justify-end">
        <div className="w-[76px] h-[32px] rounded-full mt-2 bg-gray-300" />
      </div>
      {Array.from(Array(2)).map((_, index) => (
        <div className="pb-14 animate-pulse" key={index}>
          <div className="w-[80px] h-[18px] rounded bg-gray-300 mt-3 mb-6"></div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-14 items-start">
            {Array.from(Array(4)).map((_, index) => (
              <div className="w-full h-48 card" key={index}>
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-300" />
                <div className="w-full h-12 mt-2">
                  <div className="w-full h-4 mt-2 bg-gray-300"></div>
                  <div className="w-full h-4 mt-2 bg-gray-300"></div>
                  <div className="w-[30%] h-3 mt-2 bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyHeartListLoad;

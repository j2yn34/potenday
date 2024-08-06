const ProductListLoad = () => {
  return (
    <>
      <div>
        {Array.from(Array(3)).map((_, index) => (
          <div className="pb-14 animate-pulse" key={index}>
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
        ))}
      </div>
    </>
  );
};

export default ProductListLoad;

const ProductListLoad = () => {
  return (
    <>
      <div>
        {Array.from(Array(3)).map((_, index) => (
          <div className="pb-14 animate-pulse" key={index}>
            <div className="w-[70px] h-[24px] rounded bg-gray-300 mt-3 mb-5"></div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-14 items-start">
              {Array.from(Array(4)).map((_, index) => (
                <div className="w-full h-48 card" key={index}>
                  <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-300" />
                  <div className="w-full h-12 mt-2 text-start">
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
    </>
  );
};

export default ProductListLoad;

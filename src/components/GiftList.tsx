import { FaRegHeart } from "react-icons/fa";
import { ProductCard } from "../type";

const GiftList = ({ data }: { data: ProductCard[] }) => {
  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((gift) => (
        <div
          className="flex p-3 h-[132px] rounded-lg bg-white max-w-full"
          onClick={() => (window.location.href = gift.link)}
          key={gift.id}
          role="button"
        >
          <div className="pr-3">
            <img
              className="rounded-lg w-[80px] h-[108px]"
              src={gift.imgLink}
              alt="상품 사진"
            />
          </div>
          <div className="flex flex-1 items-start justify-between min-w-0">
            <div className="flex flex-col flex-1 min-w-0">
              <p className="font-semibold mb-1 text-ellipsis overflow-hidden line-clamp-2">
                {gift.name}
              </p>
              <div className="text-sm text-gray-800">
                {gift.price.toLocaleString("ko-KR")}원
              </div>
            </div>
            <button className="flex-shrink-0 ml-2">
              <FaRegHeart size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GiftList;

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ProductCard } from "../type";
import { useState } from "react";
import NoData from "./common/NoData";

const GiftList = ({ data }: { data: ProductCard[] }) => {
  const [likedItems, setLikedItems] = useState<{ [key: number]: boolean }>({});

  const toggleLike = (id: number) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [id]: !prevLikedItems[id],
    }));
  };

  if (!Array.isArray(data)) {
    return null;
  }

  if (data.length === 0) {
    return <NoData />;
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((gift, index) => (
        <div
          className={`flex p-3 h-[132px] rounded-lg bg-white max-w-full ${
            index === data.length - 1 ? "mb-[100px]" : ""
          }`}
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
            <button
              className="flex-shrink-0 ml-2"
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(gift.id);
              }}
            >
              {likedItems[gift.id] ? (
                <FaHeart size={24} />
              ) : (
                <FaRegHeart size={24} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GiftList;

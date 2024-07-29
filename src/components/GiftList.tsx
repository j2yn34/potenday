import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ProductCard } from "../type";
import { useState } from "react";
import Notice from "./common/Notice";

const GiftList = ({
  data,
  isNoData,
}: {
  data: ProductCard[];
  isNoData: boolean;
}) => {
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

  if (isNoData) {
    return (
      <Notice
        isSad={true}
        title={"딱 맞는 선물을 찾지 못했어요."}
        text={"다음에 더 좋은 상품을 가져올게요."}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((gift, index) => (
        <a
          href={gift.link}
          key={gift.id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className={`flex p-3 h-[132px] rounded-lg bg-white max-w-full ${
              index === data.length - 1 ? "mb-[100px]" : ""
            }`}
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
        </a>
      ))}
    </div>
  );
};

export default GiftList;

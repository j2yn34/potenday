import { useState } from "react";
import { ProductType } from "../type";
import { FaHeart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";
import emptyHeart from "../assets/icons/emptyHeart.png";
import { keywordListState } from "../state/recoil";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../state/recoil";

type ProductCardProps = {
  data: ProductType;
  liked: boolean;
  isShareMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  isSharedPage?: boolean;
  giftCategory?: string;
};

const ProductCard = ({
  data,
  liked,
  isShareMode,
  isSelected,
  onSelect,
  isSharedPage,
  giftCategory,
}: ProductCardProps) => {
  const token = useRecoilValue<string>(accessTokenState);
  const formattedPrice = data.lprice.toLocaleString("ko-KR");
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const keywordList = useRecoilValue<string[]>(keywordListState);

  const handleHeart = async (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    if (isShareMode) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isLiked) {
        const response = await axios.delete(
          `/api/api/v1/user/wish/${data.productId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        if (giftCategory) {
          const giftKeywords = [
            ...keywordList,
            ...Array(6 - keywordList.length).fill(""),
          ].slice(0, 6);

          const tuning = await axios.post("/api/api/v1/ai/tuning/delete", {
            keyword1: giftKeywords[0],
            keyword2: giftKeywords[1],
            keyword3: giftKeywords[2],
            keyword4: giftKeywords[3],
            keyword5: giftKeywords[4],
            keyword6: giftKeywords[5],
            product: giftCategory,
          });
          console.log(tuning.data);
        }
      } else {
        const response = await axios.post(
          `/api/api/v1/user/wish`,
          {
            title: data.title,
            link: data.link,
            image: data.image,
            lprice: data.lprice,
            hprice: data.hprice,
            mallName: data.mallName,
            productId: data.productId,
            productType: data.productType,
            brand: data.brand,
            maker: data.maker,
            category1: data.category1,
            category2: data.category2,
            category3: data.category3,
            category4: data.category4,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        if (giftCategory) {
          const giftKeywords = [
            ...keywordList,
            ...Array(6 - keywordList.length).fill(""),
          ].slice(0, 6);

          const tuning = await axios.post("/api/api/v1/ai/tuning/add", {
            keyword1: giftKeywords[0],
            keyword2: giftKeywords[1],
            keyword3: giftKeywords[2],
            keyword4: giftKeywords[3],
            keyword5: giftKeywords[4],
            keyword6: giftKeywords[5],
            product: giftCategory,
          });
          console.log(tuning.data);
        }
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleCardClick = async () => {
    if (isShareMode) {
      return;
    }
    window.open(data.link, "_blank", "noopener,noreferrer");

    try {
      const response = await axios.post(
        `/api/api/v1/user/history`,
        {
          title: data.title,
          link: data.link,
          image: data.image,
          lprice: data.lprice,
          hprice: data.hprice,
          mallName: data.mallName,
          productId: data.productId,
          productType: data.productType,
          brand: data.brand,
          maker: data.maker,
          category1: data.category1,
          category2: data.category2,
          category3: data.category3,
          category4: data.category4,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const removeHTMLTags = (title: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(title, "text/html");
    return doc.body.textContent || "";
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    {
      onSelect && onSelect();
    }
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer relative">
      <div className="relative">
        <div className="aspect-w-1 aspect-h-1">
          {isSelected && (
            <div className="w-full h-full bg-black/[0.2] z-10 rounded-lg" />
          )}
          <img
            className="rounded-lg object-cover"
            src={data.image}
            alt="상품 사진"
          />
        </div>
        {isShareMode && (
          <div
            className={`z-20 absolute top-3 left-3 w-[18px] h-[18px] border-[1px] rounded-sm flex-center cursor-pointer ${
              isSelected
                ? "bg-orange-500 border-orange-500"
                : "bg-black/[0.1] border-white "
            }`}
            onClick={handleCheckboxClick}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
              className="hidden w-full h-full"
            />
            {isSelected && <FaCheck className="w-[12px] h-[12px] text-white" />}
          </div>
        )}
        <button
          className={`absolute z-20 bottom-0 right-0 ${
            isSharedPage && "hidden"
          }`}
          onClick={handleHeart}
        >
          {isLiked ? (
            <div className="p-3">
              <FaHeart size={24} className="text-orange-500" />
            </div>
          ) : (
            <div className="p-3">
              <img src={emptyHeart} className="w-[26px]" />
            </div>
          )}
        </button>
      </div>
      <div className="text-start">
        <div
          className={`pt-2 pb-1 text-md font-medium line-clamp-2 ${
            isSharedPage && "text-white"
          }`}
        >
          {removeHTMLTags(data.title)}
        </div>
        <div
          className={`text-sm text-gray-500 font-normal ${
            isSharedPage && "text-white"
          }`}
        >
          {formattedPrice}원
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

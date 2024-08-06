import { useState } from "react";
import { ProductType } from "../type";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import emptyHeart from "../assets/icons/emptyHeart.png";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../state/recoil";

const ProductCard = ({ data }: { data: ProductType }) => {
  const [isLiked, setIsLiked] = useState<boolean>(data.wish);
  const token = useRecoilValue<string>(accessTokenState);
  const formattedPrice = data.lprice.toLocaleString("ko-KR");

  const handleHeart = async (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
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
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleCardClick = async () => {
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

  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <div className="relative">
        <div className="aspect-w-1 aspect-h-1">
          <img
            className="rounded-lg object-cover"
            src={data.image}
            alt="상품 사진"
          />
        </div>

        <button className="absolute bottom-0 right-0" onClick={handleHeart}>
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
        <div className="pt-2 pb-1 text-md font-medium line-clamp-2">
          {removeHTMLTags(data.title)}
        </div>
        <div className="text-sm text-gray-500 font-normal">
          {formattedPrice}원
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

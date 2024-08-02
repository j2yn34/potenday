import { useState } from "react";
import { ProductType } from "../type";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ data }: { data: ProductType }) => {
  const formattedPrice = data.price.toLocaleString("ko-KR");
  const [liked, setLiked] = useState<boolean>(false);

  const handleHeart = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLiked(!liked);
  };

  return (
    <a href={data.link} target="_blank" rel="noopener noreferrer">
      <div className="relative">
        <img className="rounded-lg" src={data.imgLink} alt="상품 사진" />
        <button className="absolute bottom-0 right-0" onClick={handleHeart}>
          {liked ? (
            <div className="p-3">
              <FaHeart size={24} className="text-orange-500" />
            </div>
          ) : (
            <div className="p-3">
              <FaRegHeart size={24} className="text-white" />
            </div>
          )}
        </button>
      </div>
      <div className="text-start">
        <div className="pt-2 pb-1 text-md font-medium">{data.name}</div>
        <div className="text-sm text-gray-500 font-normal">
          {formattedPrice}원
        </div>
      </div>
    </a>
  );
};

export default ProductCard;

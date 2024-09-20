import { useState } from "react";
import { CardType, ProductType, TuningType } from "../type";
import { FaHeart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";
import emptyHeart from "../assets/icons/emptyHeart.png";
import { keywordListState } from "../state/recoil";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../state/recoil";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./common/ConfirmModal";

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const makeAxiosRequest = async (
    method: "post" | "delete",
    url: string,
    data?: CardType | TuningType,
    token?: string
  ) => {
    const config = token
      ? {
          headers: { Authorization: `Bearer ${token}` },
        }
      : {};
    return axios[method](url, data, config);
  };

  const prepareKeywords = (keywords: string[]) =>
    [...keywords, ...Array(6 - keywords.length).fill("")].slice(0, 6);

  const creatCardData = (data: ProductType): CardType => ({
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
  });

  const creatTuningData = (giftCategory: string, keywords: string[]) => {
    const giftKeywords = prepareKeywords(keywords);

    return {
      keyword1: giftKeywords[0],
      keyword2: giftKeywords[1],
      keyword3: giftKeywords[2],
      keyword4: giftKeywords[3],
      keyword5: giftKeywords[4],
      keyword6: giftKeywords[5],
      product: giftCategory,
    };
  };

  const handleHeart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isShareMode) return;

    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      openModal();
      return;
    }

    try {
      const wishUrl = `/api/api/v1/user/wish/${isLiked ? data.productId : ""}`;
      const method = isLiked ? "delete" : "post";
      const requestData = !isLiked ? creatCardData(data) : undefined;

      await makeAxiosRequest(method, wishUrl, requestData, token);

      if (giftCategory) {
        const tuningUrl = `/api/api/v1/ai/tuning/${isLiked ? "delete" : "add"}`;
        const tuningData = creatTuningData(giftCategory, keywordList);

        await makeAxiosRequest("post", tuningUrl, tuningData, token);
      }

      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleCardClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (isShareMode && onSelect) {
      e.stopPropagation();
      onSelect();
    } else {
      e.stopPropagation();
      if (!showModal) {
        window.open(data.link, "_blank", "noopener,noreferrer");

        if (token) {
          try {
            await makeAxiosRequest(
              "post",
              `/api/api/v1/user/history`,
              creatCardData(data),
              token
            );
          } catch (err) {
            console.error("Error:", err);
          }
        }
      }
    }
  };

  const removeHTMLTags = (title: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(title, "text/html");
    return doc.body.textContent || "";
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onSelect && onSelect();
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const cancel = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const goLogin = () => {
    setShowModal(false);
    navigate("/login");
    document.body.style.overflow = "auto";
  };

  return (
    <article onClick={handleCardClick} className="cursor-pointer relative">
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
          className={`absolute z-20 bottom-0 right-0 p-3 ${
            isSharedPage && "hidden"
          }`}
          onClick={handleHeart}
          aria-label={isLiked ? "관심목록에서 삭제" : "관심목록에 저장"}
        >
          {isLiked ? (
            <FaHeart size={24} className="text-orange-500" />
          ) : (
            <img src={emptyHeart} className="w-[26px]" alt="하트" />
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
      {showModal && (
        <div className="full-height">
          <ConfirmModal
            isSad={true}
            title={"로그인이 필요한 기능이에요."}
            text={"로그인하고 마음에 드는 선물을 골라보세요."}
            leftBtn={cancel}
            confirm={goLogin}
            leftName={"취소"}
            rightName={"로그인하기"}
          />
        </div>
      )}
    </article>
  );
};

export default ProductCard;

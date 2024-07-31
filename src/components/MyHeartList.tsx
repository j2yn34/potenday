import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../state/recoil";
import { FaRegHeart } from "react-icons/fa";
import { ProductCard } from "../type";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import Notice from "./common/Notice";

const MyHeartList = () => {
  const token = useRecoilValue<string>(accessTokenState);
  const [myHeartCards, setMyHeartCards] = useState<ProductCard[]>([]);

  useEffect(() => {
    const getHeartListData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "/api/api/v1/user/wish",
          headers: { Authorization: `Bearer ${token}` },
          responseType: "json",
        });
        console.log(response.data.data);
        const data = Array.isArray(response.data) ? response.data : [];
        setMyHeartCards(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getHeartListData();
  }, [token]);

  return (
    <div className="relative w-full full-height overflow-hidden px-5 mx-auto max-w-screen-lg">
      <div className="absolute z-40 pt-8 -ml-1">
        <Link to="/">
          <IoChevronBackSharp size={24} />
        </Link>
      </div>
      <h1 className="mb-8 pt-8 text-center font-semibold text-xl leading-8">
        관심 목록
      </h1>
      <div className="flex flex-col gap-3">
        {myHeartCards.length === 0 ? (
          <div className="flex-center full-height -mt-16">
            <Notice
              isSad={false}
              title={"관심 선물이 없어요."}
              text={"선물을 추천 받고 하트를 눌러 보세요."}
              nav="/voice"
              btnName="선물 고르러 가기"
            />
          </div>
        ) : (
          myHeartCards.map((card) => (
            <div
              className="flex p-3 h-[132px] rounded-lg bg-white max-w-full"
              onClick={() => (window.location.href = card.link)}
              key={card.id}
              role="button"
            >
              <div className="pr-3">
                <img
                  className="rounded-lg w-[80px] h-[108px]"
                  src={card.imgLink}
                  alt="상품 사진"
                />
              </div>
              <div className="flex flex-1 items-start justify-between min-w-0">
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="font-semibold mb-1 text-ellipsis overflow-hidden line-clamp-2">
                    {card.name}
                  </p>
                  <div className="text-sm text-gray-800">
                    {card.price.toLocaleString("ko-KR")}원
                  </div>
                </div>
                <button className="flex-shrink-0 ml-2">
                  <FaRegHeart size={24} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyHeartList;

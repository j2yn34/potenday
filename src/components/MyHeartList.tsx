import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../state/recoil";
import { FaRegHeart } from "react-icons/fa";
import { ProductCard } from "../type";

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
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setMyHeartCards(response.data);
        } else {
          console.error("배열이 아닌 데이터");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getHeartListData();
  }, [token]);

  return (
    <div className="flex flex-col gap-3">
      {myHeartCards.map((card) => (
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
      ))}
    </div>
  );
};

export default MyHeartList;

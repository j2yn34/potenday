import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../state/recoil";
import { ProductListType, ProductType } from "../type";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import Notice from "./common/Notice";
import ProductCard from "./ProductCard";

const MyHeartList = () => {
  const token = useRecoilValue<string>(accessTokenState);
  const [myHeartCards, setMyHeartCards] = useState<ProductListType[]>([]);

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
        const data = Array.isArray(response.data.data) ? response.data : [];
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
          <div className="flex flex-col gap-3">
            {myHeartCards.map((gift) => (
              <div key={gift.category}>
                <div>{gift.category}</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 items-start">
                  {gift.products.map((product: ProductType, index: number) => (
                    <ProductCard
                      data={product}
                      key={`${product.productId}+${index}`}
                      liked={true}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHeartList;

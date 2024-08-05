import GiftList from "../components/GiftList";
import { useNavigate } from "react-router";
import { giftListState, keywordListState } from "../state/recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";
import axios from "axios";
import LoadingFull from "../components/common/LoadingFull";
import { ProductListType } from "../type";

const GiftListPage = () => {
  const giftList = useRecoilValue(giftListState);
  const keywordList = useRecoilValue<string[]>(keywordListState);
  const setGiftList = useSetRecoilState<ProductListType[]>(giftListState);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloaded, setIsReloaded] = useState(false);
  const navigate = useNavigate();
  console.log(giftList);
  const totalCount = giftList.reduce(
    (acc, gift) => acc + gift.products.length,
    0
  );
  // const [selectedCategory, setSelectedCategory] = useState<string>("");
  // const categories = [...new Set(giftList.map((gift) => gift.category))];

  // const filteredGifts = selectedCategory
  //   ? giftList.filter((gift) => gift.category === selectedCategory)
  //   : giftList;

  // const handleCategoryClick = (category: string) => {
  //   setSelectedCategory(category);
  // };

  const goHome = () => {
    navigate("/");
  };

  const onReLoadGiftList = () => {
    setIsLoading(true);
    setIsReloaded(true);
    const queryString = keywordList
      .map((keyword: string) => `keyword=${keyword.trim()}`)
      .join("&");
    const url = `/api/api/v1/product/recommend?${queryString}`;

    axios
      .get(url)
      .then((res) => {
        console.log("Response:", res.data.data.items);
        setGiftList(res.data.data.items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <LoadingFull />;
  }

  return (
    <div className="relative w-full full-height overflow-hidden px-5 mx-auto max-w-screen-lg">
      <h1 className="mb-8 pt-8 text-center font-semibold text-xl leading-8">
        총 {totalCount}개의 추천 선물
      </h1>
      {/* {categories.length != 0 && (
        <div className="absolute z-40 pt-8 -ml-1">
          <button onClick={() => handleCategoryClick("")}>All</button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )} */}
      <div className="overflow-y-auto h-full pb-24">
        <GiftList data={giftList} />
      </div>
      <div className="fixed max-w-[480px] bottom-0 left-0 right-0 z-50 flex justify-center gap-2 p-4 bg-[#E6E4F1]">
        <button
          className={`basic-button border mr-2 ${
            isReloaded
              ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white border-black"
          }`}
          onClick={onReLoadGiftList}
          disabled={isReloaded}
        >
          선물 다시 불러오기
        </button>
        <button className="basic-button bg-black text-white" onClick={goHome}>
          홈으로
        </button>
      </div>
    </div>
  );
};

export default GiftListPage;

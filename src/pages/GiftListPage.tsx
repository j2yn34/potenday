import { useNavigate } from "react-router";
import { commentState, giftListState, keywordListState } from "../state/recoil";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import GiftList from "../components/GiftList";
import LoadingFull from "../components/common/LoadingFull";
import { ProductListType } from "../type";
import fullGift from "../assets/icons/fullGift.png";

const GiftListPage = () => {
  const giftList = useRecoilValue(giftListState);
  const keywordList = useRecoilValue<string[]>(keywordListState);
  const setGiftList = useSetRecoilState<ProductListType[]>(giftListState);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloaded, setIsReloaded] = useState(false);
  const [comment, setComment] = useRecoilState(commentState);
  const navigate = useNavigate();
  console.log(giftList);
  const totalCount = giftList.reduce(
    (acc, gift) => acc + gift.products.length,
    0
  );

  const categories = [...new Set(giftList.map((gift) => gift.category))];
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0] || ""
  );

  const filteredGifts = selectedCategory
    ? giftList.filter((gift) => gift.category === selectedCategory)
    : giftList;

  useEffect(() => {
    if (categories.length > 0 && selectedCategory) {
      const commentUrl = `/api/api/v1/ai/category/comment`;
      axios
        .get(commentUrl, { params: { category: selectedCategory } })
        .then((res) => {
          setComment(res.data.data.comment);
        });
    }
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const commentUrl = `/api/api/v1/ai/category/comment?category=${category}`;
    axios.get(commentUrl).then((res) => {
      setComment(res.data.data.comment);
    });
  };

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
    <div className="relative w-full full-height overflow-hidden mx-auto max-w-screen-lg">
      <h1 className="mb-8 pt-8 text-center font-semibold text-xl leading-8">
        총 {totalCount}개의 추천 선물
      </h1>
      {categories.length !== 0 && (
        <>
          <div className="flex overflow-x-auto gap-5 mb-6 px-5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`${
                  selectedCategory === category ? "text-black" : "text-gray-500"
                } font-semibold whitespace-nowrap`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mb-4 px-5">
            <div className="flex items-center gap-[6px] pl-2 mb-2">
              <img src={fullGift} className="w-[16px] h-[16px]" />
              <span className="text-orange-500 text-sm font-semibold">
                T!FY’s Comment
              </span>
            </div>
            <div className="w-full h-full bg-orange-50 rounded-xl border border-orange-200 px-5 py-3">
              <p className="text-orange-500 text-sm font-medium">{comment}</p>
            </div>
          </div>
          <div className="w-screen h-[26px] mb-3 pl-5 -ml-5 bg-gray-100">
            <span className="text-xs text-gray-600 font-medium pl-5">
              할인가가 적용되지 않은 가격입니다.
            </span>
          </div>
        </>
      )}
      <div className="overflow-y-auto h-full px-5 pb-24">
        <GiftList data={filteredGifts} />
      </div>
      <div className="fixed w-full max-w-[480px] bottom-0 z-50 flex justify-center gap-2 p-4 bg-[#E6E4F1]">
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

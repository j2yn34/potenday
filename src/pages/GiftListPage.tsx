import { useNavigate } from "react-router";
import { commentState, giftListState, keywordListState } from "../state/recoil";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import GiftList from "../components/GiftList";
import LoadingFull from "../components/common/LoadingFull";
import { ProductListType } from "../type";
import fullGift from "../assets/icons/fullGift.png";
import Lottieloading from "../assets/lottie/loading.json";
import Lottie from "lottie-react";
import goHomeLottie from "../assets/lottie/home.json";

const GiftListPage = () => {
  const giftList = useRecoilValue(giftListState);
  const keywordList = useRecoilValue<string[]>(keywordListState);
  const setGiftList = useSetRecoilState<ProductListType[]>(giftListState);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isReloaded, setIsReloaded] = useState(false);
  const [comment, setComment] = useRecoilState(commentState);
  const [showGoHomeScreen, setShowGoHomeScreen] = useState(false);
  const navigate = useNavigate();
  const totalCount = giftList.reduce(
    (acc, gift) => acc + gift.products.length,
    0
  );

  const categories = [...new Set(giftList.map((gift) => gift.category))];
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0] || ""
  );
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [commentsCache, setCommentsCache] = useState<{ [key: string]: string }>(
    {}
  );

  const filteredGifts = selectedCategory
    ? giftList.filter((gift) => gift.category === selectedCategory)
    : giftList;

  useEffect(() => {
    if (categories.length > 0 && !initialFetchDone) {
      handleCategoryClick(categories[0]);
      setInitialFetchDone(true);
    }
  }, [categories, initialFetchDone]);

  const handleCategoryClick = async (category: string) => {
    setSelectedCategory(category);

    if (commentsCache[category]) {
      setComment(commentsCache[category]);
      return;
    }

    setIsCommentLoading(true);
    try {
      const commentUrl = `/api/api/v1/ai/category/comment`;
      const res = await axios.get(commentUrl, {
        params: { category },
      });
      const newComment = res.data.data.comment;
      setComment(newComment);

      setCommentsCache((prevCache) => ({
        ...prevCache,
        [category]: newComment,
      }));
    } catch (err) {
      console.error("Error comment:", err);
      setComment("코멘트를 불러오는 중 오류가 발생했어요.");
    } finally {
      setIsCommentLoading(false);
    }
  };

  const goHome = () => {
    setShowGoHomeScreen(true);
    setTimeout(() => {
      navigate("/");
    }, 1600);
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

  if (showGoHomeScreen) {
    return (
      <div className="full-height flex-center pb-24">
        <div className="flex-col">
          <Lottie
            animationData={goHomeLottie}
            className="w-[240px] h-[240px] mb-2"
          />
          <div className="text-xl text-center font-semibold">
            TIFY의 추천 어떠셨나요?
            <br />
            다음에 또 찾아주세요!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden full-height mx-auto max-w-screen-lg bg-purple-50">
      <div className="fixed top-0 z-50 w-full max-w-[480px] bg-purple-50">
        <h1 className="py-7 text-center font-semibold text-xl leading-8">
          총 {totalCount}개의 추천 선물
        </h1>
      </div>
      {categories.length !== 0 && (
        <>
          <div className="fixed top-[88px] z-50 w-full max-w-[480px] bg-purple-50">
            <div className="flex category-scroll overflow-x-auto gap-5 mb-2 px-5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`${
                    selectedCategory === category
                      ? "text-black"
                      : "text-gray-500"
                  } font-semibold whitespace-nowrap py-2`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-[152px] mb-6 px-5">
            <div className="flex items-center gap-[6px] pl-2 mb-2">
              <img src={fullGift} className="w-[16px] h-[16px]" />
              <span className="text-orange-500 text-sm font-semibold">
                T!FY’s Comment
              </span>
            </div>
            <div className="w-full h-full bg-orange-50 rounded-xl border border-orange-200 px-5 py-3">
              {isCommentLoading ? (
                <Lottie
                  animationData={Lottieloading}
                  className="h-[90px] -m-2"
                />
              ) : (
                <p className="text-orange-500 text-sm font-medium">{comment}</p>
              )}
            </div>
          </div>
          <div className="w-[calc(100%+40px)] h-[26px] mb-3 pl-5 -ml-5 bg-gray-100">
            <span className="text-xs text-gray-600 font-medium pl-5">
              할인가가 적용되지 않은 가격입니다.
            </span>
          </div>
        </>
      )}
      <div className="overflow-y-auto h-full px-5 pb-24">
        {filteredGifts.every((gift) => gift.products.length === 0) ? (
          <p className="text-center text-gray-500 text-sm pt-20">
            아직 TIFY에 해당 카테고리의 상품이 없습니다.
          </p>
        ) : (
          <GiftList data={filteredGifts} />
        )}
      </div>
      <div className="fixed w-full max-w-[480px] bottom-0 z-40 flex justify-center gap-2 p-4 bg-purple-50">
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

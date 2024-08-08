import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../state/recoil";
import { HeartListType, HeartTimeList, ProductType } from "../type";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import Notice from "./common/Notice";
import formatDate from "../hooks/formatDate";
import ProductCard from "./ProductCard";
import shareIcon from "../assets/icons/share.png";

const MyHeartList = () => {
  const token = useRecoilValue<string>(accessTokenState);
  const [myHeartCards, setMyHeartCards] = useState<HeartListType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [groupedHeart, setGroupedHeart] = useState<GroupedHeartType>({});
  const [isShareMode, setIsShareMode] = useState<boolean>(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(
    new Set()
  );

  type GroupedHeartType = {
    [key: string]: HeartTimeList[];
  };

  useEffect(() => {
    const getHeartListData = async () => {
      try {
        const response = await axios.get("/api/api/v1/user/wish", {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "json",
        });

        const data = Array.isArray(response.data.data.userWishList)
          ? response.data.data.userWishList
          : [];
        setMyHeartCards(data);

        const timeListData = data.flatMap(
          (item: { timeList: HeartTimeList }) => item.timeList
        );
        setGroupedHeart(groupByDate(timeListData));

        setSelectedCategory("");
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getHeartListData();
  }, [token]);

  useEffect(() => {
    if (selectedCategory) {
      const filteredItems =
        myHeartCards.find((item) => item.category === selectedCategory)
          ?.timeList || [];
      setGroupedHeart(groupByDate(filteredItems));
    } else {
      const timeListData = myHeartCards.flatMap((item) => item.timeList);
      setGroupedHeart(groupByDate(timeListData));
    }
  }, [selectedCategory, myHeartCards]);

  const categories = [...new Set(myHeartCards.map((item) => item.category))];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const groupByDate = (myHeartTimeList: HeartTimeList[]): GroupedHeartType => {
    const groupedData: GroupedHeartType = {};
    myHeartTimeList.forEach((item) => {
      const formattedDate = formatDate(item.insDate);
      if (!groupedData[formattedDate]) {
        groupedData[formattedDate] = [];
      }
      groupedData[formattedDate].push(item);
    });
    return groupedData;
  };

  const handleShareModeToggle = () => {
    setIsShareMode(!isShareMode);
    if (isShareMode) {
      setSelectedProducts(new Set());
    }
  };

  const handleProductSelect = (productId: number) => {
    const newSelectedProducts = new Set(selectedProducts);
    if (newSelectedProducts.has(productId)) {
      newSelectedProducts.delete(productId);
    } else {
      newSelectedProducts.add(productId);
    }
    setSelectedProducts(newSelectedProducts);
  };

  const handleShare = async () => {
    const prdIdList = Array.from(selectedProducts);
    try {
      const response = await axios.post(
        "/api/api/v1/user/share",
        { prdIdList },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const shareLink = response.data.data.userWishShareUrl;
      console.log("Share link:", response.data.data.userWishShareUrl);
      navigator.clipboard.writeText(shareLink);
      setShowCopiedMessage(true);
      setTimeout(() => {
        setShowCopiedMessage(false);
      }, 2000);
    } catch (error) {
      console.error("Error handleShare:", error);
    } finally {
      setIsShareMode(false);
      setSelectedProducts(new Set());
    }
  };

  return (
    <div className="relative w-full full-height overflow-hidden px-5 mx-auto max-w-screen-lg bg-purple-50">
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
          <div className="flex flex-col">
            <div>
              <div className="flex category-scroll overflow-x-auto gap-5 pb-3">
                <button
                  onClick={() => handleCategoryClick("")}
                  className={`${
                    selectedCategory === "" ? "text-black" : "text-gray-500"
                  } font-semibold whitespace-nowrap`}
                >
                  전체
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`${
                      selectedCategory === category
                        ? "text-black"
                        : "text-gray-500"
                    } font-semibold whitespace-nowrap`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="w-screen -ml-5 h-[6px] bg-[#E7E5F2]" />
            </div>
            <div className="flex w-full items-center justify-between">
              {isShareMode && (
                <span className="text-sm font-medium flex-shrink-0">
                  {selectedProducts.size}개의 선물 선택
                </span>
              )}
              <div className="flex w-full justify-end py-3">
                <button
                  className="flex-center gap-1 w-fit px-4 py-[6px] bg-white rounded-full border border-gray-300"
                  onClick={handleShareModeToggle}
                >
                  <img
                    src={shareIcon}
                    className={`w-4 h-4 ${isShareMode && "hidden"}`}
                  />
                  <span className="text-sm font-medium">
                    {isShareMode ? "취소" : "공유"}
                  </span>
                </button>
              </div>
            </div>
            <div className={`${isShareMode && "pb-[100px] "}`}>
              {Object.keys(groupedHeart).map((date) => (
                <div key={date} className="pb-8">
                  <div className="pb-6 font-medium">{date}</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-8 items-start">
                    {groupedHeart[date].flatMap((item) =>
                      item.itemList.map((product: ProductType) => (
                        <ProductCard
                          key={product.productId}
                          data={product}
                          liked={true}
                          isShareMode={isShareMode}
                          isSelected={selectedProducts.has(product.productId)}
                          onSelect={() =>
                            handleProductSelect(product.productId)
                          }
                        />
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
            {showCopiedMessage && (
              <div className="fixed z-50 bottom-0 w-full max-w-[480px] -ml-5 pt-4 pb-10 px-5">
                <div className="flex-center w-full h-[41px] bg-black rounded-md">
                  <FaCheckCircle className="text-orange-500 mr-2" />
                  <span className="text-white text-sm">
                    링크가 복사되었어요!
                  </span>
                </div>
              </div>
            )}
            {isShareMode && (
              <div className="fixed z-50 bottom-0 w-full max-w-[480px] -ml-5 bg-purple-50 pt-4 pb-8 px-5">
                <button
                  className={`w-full py-4 rounded-lg ${
                    selectedProducts.size === 0
                      ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                      : "bg-black text-white"
                  }`}
                  onClick={handleShare}
                  disabled={selectedProducts.size === 0}
                >
                  링크 공유하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHeartList;

import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../state/recoil";
import { HeartListType, HeartTimeList, ProductType } from "../type";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import Notice from "./common/Notice";
import formatDate from "../hooks/formatDate";
import ProductCard from "./ProductCard";

const MyHeartList = () => {
  const token = useRecoilValue<string>(accessTokenState);
  const [myHeartCards, setMyHeartCards] = useState<HeartListType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [groupedHeart, setGroupedHeart] = useState<GroupedHeartType>({});

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
        console.log(data);
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

  // console.log("groupedHeart", groupedHeart);

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
            <div className="mb-6">
              <div className="flex overflow-x-auto gap-5 pb-3">
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
            <div>
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
                        />
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHeartList;

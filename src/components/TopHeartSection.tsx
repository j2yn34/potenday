import { useEffect, useState } from "react";
import TopHeartList from "./TopHeartList";
import axios from "axios";
import { ProductCard } from "../type";
import TopHeartListLoad from "./skeletonUI.tsx/TopHeartListLoad";

const TopHeartSection = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [groupedProducts, setGroupedProducts] = useState<{
    [key: string]: ProductCard[];
  }>({});

  useEffect(() => {
    const getTopHeartData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/api/v1/product/popular/info");
        // console.log(response);
        const { popularCategory, popularInfoList } = response.data.data;

        if (popularCategory && popularInfoList) {
          const grouped = popularCategory.reduce(
            (acc: { [key: string]: ProductCard[] }, category: string) => {
              acc[category] = popularInfoList.filter(
                (product: ProductCard) => product.lgCtgry === category
              );

              return acc;
            },
            {}
          );

          setGroupedProducts(grouped);
          setIsLoading(false);
          // console.log("grouped: ", grouped);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getTopHeartData();
  }, []);

  return (
    <>
      {isLoading ? (
        <TopHeartListLoad />
      ) : (
        <>
          <div className="max-w-fit bg-orange-50 rounded text-xs text-orange-500 px-2.5 py-1 whitespace-nowrap">
            티피의 인기 선물
          </div>
          {Object.keys(groupedProducts).map((category) => (
            <TopHeartList
              category={category}
              products={groupedProducts[category]}
              key={category}
            />
          ))}
        </>
      )}
    </>
  );
};

export default TopHeartSection;

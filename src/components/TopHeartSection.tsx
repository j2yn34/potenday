import { useEffect, useState } from "react";
import TopHeartList from "./TopHeartList";
import axios from "axios";
import { ProductCard } from "../type";

const TopHeartSection = () => {
  const [groupedProducts, setGroupedProducts] = useState<{
    [key: string]: ProductCard[];
  }>({});

  useEffect(() => {
    const getTopHeartData = async () => {
      try {
        const response = await axios.get("/api/api/v1/product/popular/info");
        console.log(response);
        const { popularCategory, popularInfoList } = response.data.data;

        if (popularCategory && popularInfoList) {
          const grouped = popularCategory.reduce(
            (acc: { [key: string]: ProductCard[] }, category: string) => {
              acc[category] = popularInfoList.filter(
                (product: ProductCard) => product.lgCtgry === category
              );
              console.log(popularInfoList);

              return acc;
            },
            {}
          );

          setGroupedProducts(grouped);
          console.log("grouped: ", grouped);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getTopHeartData();
  }, []);

  return (
    <div>
      {Object.keys(groupedProducts).map((category) => (
        <TopHeartList
          category={category}
          products={groupedProducts[category]}
          key={category}
        />
      ))}
    </div>
  );
};

export default TopHeartSection;

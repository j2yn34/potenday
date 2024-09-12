import { useEffect, useState } from "react";
import PopularList from "./PopularList";
import axios from "axios";
import { ProductType } from "../type";
import PopularListLoad from "./skeletonUI/PopularListLoad";
import { ProductListType } from "../type";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../state/recoil";

const PopularSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groupedProducts, setGroupedProducts] = useState<ProductListType[]>([]);
  const token = useRecoilValue<string>(accessTokenState);

  useEffect(() => {
    const getPopularData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/api/v1/product/popular/info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { items }: { items: ProductListType[] } = response.data.data;

        if (items) {
          const allProducts = items.reduce<ProductType[]>((acc, item) => {
            const category = item.category;
            const productsWithCategory = item.products.map((product) => ({
              ...product,
              category1: category,
            }));
            return [...acc, ...productsWithCategory];
          }, []);

          const grouped = allProducts.reduce<{ [key: string]: ProductType[] }>(
            (acc, product) => {
              if (!acc[product.category1]) {
                acc[product.category1] = [];
              }
              acc[product.category1].push(product);
              return acc;
            },
            {}
          );

          const groupedArray: ProductListType[] = Object.entries(grouped).map(
            ([key, value]) => ({
              category: key,
              products: value,
            })
          );

          console.log("grouped: ", groupedArray);
          setGroupedProducts(groupedArray);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error:", err);
        setIsLoading(false);
      }
    };

    getPopularData();
  }, []);

  return (
    <>
      {isLoading ? (
        <PopularListLoad />
      ) : groupedProducts.length === 0 ? (
        <div className="flex-center pb-16 text-gray-400 text-center text-sm">
          아직 인기 선물이 없어요. <br />
          가장 먼저 하트를 눌러 보세요!
        </div>
      ) : (
        <>
          {groupedProducts.map((group) => (
            <PopularList
              category={group.category}
              products={group.products}
              key={group.category}
            />
          ))}
        </>
      )}
    </>
  );
};

export default PopularSection;

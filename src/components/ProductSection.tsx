import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import axios from "axios";
import { ProductType } from "../type";
import ProductListLoad from "./skeletonUI/ProductListLoad";
import { ProductListType } from "../type";

const ProductSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groupedProducts, setGroupedProducts] = useState<ProductListType[]>([]);

  useEffect(() => {
    const getTopHeartData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/api/v1/product/popular/info");
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

    getTopHeartData();
  }, []);

  return (
    <>
      {isLoading ? (
        <ProductListLoad />
      ) : (
        <>
          {groupedProducts.map((group) => (
            <ProductList
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

export default ProductSection;

import HighSatisfactionCard from "./HighSatisfactionCard";
import productExample from "../assets/images/productExample.jpg";

const HighSatisfactionSection = ({ category }: { category: string }) => {
  const products = Array.from({ length: 4 }, (_, i) => ({
    productId: i + 1,
    keyword: ["직장동료"],
    category: { category },
    productName: "미드센츄리 모던 스탠드 56cm",
    price: 54000,
    imgSrc: productExample,
  }));

  return (
    <div className="pb-14">
      <div className="pt-2 pb-5 text-xl font-semibold">{category}</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        {products.map((product) => (
          <HighSatisfactionCard data={product} key={product.productId} />
        ))}
      </div>
    </div>
  );
};

export default HighSatisfactionSection;

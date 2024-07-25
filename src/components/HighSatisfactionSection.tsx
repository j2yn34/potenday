import HighSatisfactionCard from "./HighSatisfactionCard";
import productExample from "../assets/images/productExample.jpg";

interface HighSatisfactionSectionProps {
  keyword: string;
}

const HighSatisfactionSection: React.FC<HighSatisfactionSectionProps> = ({
  keyword,
}) => {
  const products = Array.from({ length: 6 }, (_, i) => ({
    productId: i + 1,
    keyword: [keyword],
    productName: "미드센츄리 모던 스탠드 56cm",
    price: 54000,
    imgSrc: productExample,
  }));

  return (
    <div className="pb-9">
      <div className="w-max bg-orange-50 rounded text-xs text-orange-500 text-center px-2.5 py-1">
        추천 만족도가 높은 상품
      </div>
      <div className="pt-[6px] text-lg font-semibold">
        {keyword}를 위한 선물
      </div>
      <div className="grid grid-cols-3 gap-3">
        {products.map((product) => (
          <HighSatisfactionCard data={product} key={product.productId} />
        ))}
      </div>
    </div>
  );
};

export default HighSatisfactionSection;

import { ProductCard } from "../type";

const HighSatisfactionCard = ({ data }: { data: ProductCard }) => {
  return (
    <div className="pt-3">
      <img className="rounded-lg" src={data.imgSrc} alt="상품 사진" />
      <div>
        <div className="pt-2 pb-1 text-xs font-medium">{data.productName}</div>
        <div className="text-xs text-gray-500 font-normal">{data.price}원</div>
      </div>
    </div>
  );
};

export default HighSatisfactionCard;

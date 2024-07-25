import { ProductCard } from "../type";

const HighSatisfactionCard = ({ data }: { data: ProductCard }) => {
  return (
    <div>
      <img className="rounded-lg" src={data.imgSrc} alt="상품 사진" />
      <div>
        <div className="pt-2 pb-1 text-md font-medium">{data.productName}</div>
        <div className="text-sm text-gray-500 font-normal">{data.price}원</div>
      </div>
    </div>
  );
};

export default HighSatisfactionCard;

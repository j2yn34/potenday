import { ProductCard } from "../type";

const TopHeartCard = ({ data }: { data: ProductCard }) => {
  const formattedPrice = data.price.toLocaleString("ko-KR");

  return (
    <a href={data.link} target="_blank" rel="noopener noreferrer">
      <img className="rounded-lg" src={data.imgLink} alt="상품 사진" />
      <div className="text-start">
        <div className="pt-2 pb-1 text-md font-medium">{data.name}</div>
        <div className="text-sm text-gray-500 font-normal">
          {formattedPrice}원
        </div>
      </div>
    </a>
  );
};

export default TopHeartCard;

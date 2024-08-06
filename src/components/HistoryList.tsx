import ProductCard from "./ProductCard";
import { HistoryListType } from "../type";

const HistoryList = ({
  date,
  products,
}: {
  date: string;
  products: HistoryListType[];
}) => {
  return (
    <div className="pb-14">
      <div className="pb-6 font-medium">{date}</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 items-start">
        {products.map((historyItem) => (
          <ProductCard
            key={historyItem.id}
            data={historyItem.product}
            liked={historyItem.wish}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryList;

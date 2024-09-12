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
    <section className="pb-14">
      <p className="pb-6 font-medium">{date}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 items-start">
        {products.map((historyItem) => (
          <ProductCard
            key={historyItem.id}
            data={historyItem.product}
            liked={historyItem.wish}
          />
        ))}
      </div>
    </section>
  );
};

export default HistoryList;

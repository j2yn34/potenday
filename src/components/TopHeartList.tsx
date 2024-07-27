import TopHeartCard from "./TopHeartCard";
import { ProductCard } from "../type";

const TopHeartList = ({
  category,
  products,
}: {
  category: string;
  products: ProductCard[];
}) => {
  return (
    <div className="pb-14">
      <div className="pt-2 pb-5 text-xl font-semibold">{category}</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        {products.map((product) => (
          <TopHeartCard data={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default TopHeartList;

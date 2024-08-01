import ProductCard from "./ProductCard";
import { ProductType } from "../type";

const ProductList = ({
  category,
  products,
}: {
  category: string;
  products: ProductType[];
}) => {
  return (
    <div className="pb-14">
      <div className="pt-2 pb-5 text-xl font-semibold">{category}</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 items-start">
        {products.map((product) => (
          <ProductCard data={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

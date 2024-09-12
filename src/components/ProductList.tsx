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
    <section className="pb-14">
      <h3 className="pt-2 pb-5 text-xl font-semibold">{category}</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 items-start">
        {products.map((product) => (
          <ProductCard
            data={product}
            key={product.productId}
            liked={product.wish}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductList;

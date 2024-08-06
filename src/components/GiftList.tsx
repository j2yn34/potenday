import Notice from "./common/Notice";
import { ProductListType, ProductType } from "../type";
import ProductCard from "./ProductCard";

const GiftList = ({ data }: { data: ProductListType[] }) => {
  if (data.length === 0) {
    return (
      <div className="pt-28">
        <Notice
          isSad={true}
          title={"딱 맞는 선물을 찾지 못했어요."}
          text={"다음에 더 좋은 상품을 가져올게요."}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((gift) => (
        <div key={gift.category}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 items-start">
            {gift.products.map((product: ProductType, index: number) => (
              <ProductCard
                data={product}
                key={`${product.productId}+${index}`}
                liked={product.wish}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GiftList;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ProductType } from "../type";
import sharedTify from "../assets/images/shared.svg";

const SharedPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSharedProducts = async () => {
      try {
        const response = await axios.get(`/api/api/v1/product/share/${id}`);
        setProducts(response.data.data.userWishShareList);
      } catch (err) {
        console.error("Error fetchSharedProducts:", err);
      }
    };

    fetchSharedProducts();
  }, []);

  return (
    <div className="shared-bg relative w-full overflow-hidden mx-auto max-w-screen-lg">
      <div className="w-full full-height shared-bg-img px-5">
        <div className="flex flex-col">
          {products.length === 0 ? (
            <div className="flex-center full-height -mt-16 text-white">
              <p>공유된 상품이 없습니다.</p>
            </div>
          ) : (
            <>
              <div className="flex-center pt-3">
                <img src={sharedTify} />
              </div>
              <h1 className="text-white pt-10 mb-8 text-center font-semibold text-xl leading-8">
                공유된 관심 선물을 둘러 보세요!
              </h1>
              <div className="pb-[120px]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 items-start">
                  {products.map((product) => (
                    <ProductCard
                      key={product.productId}
                      data={product}
                      liked={false}
                      isSharedPage={true}
                    />
                  ))}
                </div>
              </div>
              <div className="fixed bottom-0 w-full max-w-[480px] -ml-5 px-5 pt-4 pb-8 z-50 bg-[#0E1013]">
                <button
                  className="w-full py-4 bg-orange-500 text-white rounded-lg"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  나도 선물 고르러 가기
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default SharedPage;

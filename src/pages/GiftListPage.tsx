import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import GiftList from "../components/GiftList";
import { useNavigate } from "react-router";
import { giftListState } from "../state/recoil";
import { useRecoilValue } from "recoil";

const GiftListPage = () => {
  const giftList = useRecoilValue(giftListState);
  console.log(giftList);
  const navigate = useNavigate();
  const length = giftList?.length ?? 0;
  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="relative h-screen overflow-hidden px-5">
      <div className="absolute z-40 pt-8 -ml-1">
        <Link to="/">
          <IoCloseOutline size={30} />
        </Link>
      </div>
      <h1 className="mb-8 pt-8 text-center font-semibold text-xl leading-8">
        총 {length}개의 추천 선물
      </h1>
      <div className="overflow-y-auto h-full pb-24">
        <GiftList data={giftList} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-2 p-4 bg-[#E6E4F1]">
        <button className="basic-button bg-white border border-black">
          선물 다시 불러오기
        </button>
        <button className="basic-button bg-black text-white" onClick={goHome}>
          홈으로
        </button>
      </div>
    </div>
  );
};

export default GiftListPage;

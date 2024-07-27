import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { keywordListState } from "../state/recoil";
import KeywordList from "../components/KeywordList";

const KeywordListPage = () => {
  const keywordList = useRecoilValue(keywordListState);
  const navigate = useNavigate();
  const nickname = "지연";

  const submitRequest = () => {
    const queryString = keywordList
      .map((keyword) => `keyword=${encodeURIComponent(keyword.trim())}`)
      .join("&");

    const url = `/api/v1/product/recommend?${queryString}`;

    axios
      .get(url)
      .then((res) => {
        console.log("Response:", res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
    navigate("/giftlist");
  };

  return (
    <div className="px-5 h-screen flex flex-col justify-between">
      <div className="absolute z-40 pt-8 -ml-1">
        <Link to="/">
          <IoCloseOutline size={30} />
        </Link>
      </div>
      <h1 className="pt-[84px] text-center font-semibold text-xl leading-8">
        {nickname}님이
        <br />
        원하시는 선물은
      </h1>
      <div className="flex-center h-full mt-8 mb-9">
        <KeywordList />
      </div>
      <div className="flex-center gap-2 mb-8">
        <button className="basic-button bg-white border border-black">
          다시 할래요
        </button>
        <button
          onClick={submitRequest}
          className="basic-button bg-black text-white"
        >
          맞아요
        </button>
      </div>
    </div>
  );
};

export default KeywordListPage;

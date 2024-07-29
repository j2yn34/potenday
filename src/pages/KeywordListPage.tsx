import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  keywordListState,
  giftListState,
  userInfoState,
  transcriptState,
} from "../state/recoil";
import KeywordList from "../components/KeywordList";
import { ProductCard } from "../type";
import { useEffect, useState } from "react";
import LoadingFull from "../components/common/LoadingFull";
import { UserInfoState } from "../state/recoilType";
import ConfirmModal from "../components/common/ConfirmModal";

const KeywordListPage = () => {
  const keywordList = useRecoilValue<string[]>(keywordListState);
  const transcript = useRecoilValue<string>(transcriptState);
  const userInfo = useRecoilValue<UserInfoState>(userInfoState);
  const setGiftList = useSetRecoilState<ProductCard[]>(giftListState);
  const setKeywordList = useSetRecoilState(keywordListState);
  const navigate = useNavigate();
  const nickname = userInfo.nickname;
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [showKeywordErrModal, setShowKeywordErrModal] =
    useState<boolean>(false);
  const [showGistListErrModal, setShowGistListErrModal] =
    useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const submitKeywords = () => {
    setIsLoading(true);
    const queryString = keywordList
      .map((keyword: string) => `keyword=${keyword.trim()}`)
      .join("&");
    const url = `/api/api/v1/product/recommend?${queryString}`;

    axios
      .get(url)
      .then((res) => {
        console.log("Response:", res.data.data);
        setGiftList(res.data.data);
        setIsLoading(false);
        navigate("/giftlist");
      })
      .catch((err) => {
        console.error("Error:", err);
        setIsLoading(false);
        openGiftListErrModal();
      });
  };

  const reloadKeyword = () => {
    setIsLoading(true);
    console.log(transcript);
    axios
      .get(`/api/api/v1/ai/parsing/keyword?text=${transcript}`)
      .then((res) => {
        console.log("Response:", res.data);
        setKeywordList(res.data.data.keywordList);
        if (res.data.data.keywordList.length === 0) {
          setIsLoading(false);
          openKeywordErrModal();
        }
        console.log("keywordList: ", res.data.data.keywordList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setIsLoading(false);
        openKeywordErrModal();
      });
  };

  if (isLoading) {
    return <LoadingFull />;
  }
  const openKeywordErrModal = () => {
    setShowKeywordErrModal(true);
    document.body.style.overflow = "hidden";
  };

  const openGiftListErrModal = () => {
    setShowGistListErrModal(true);
    document.body.style.overflow = "hidden";
  };

  const goVoice = () => {
    setShowKeywordErrModal(false);
    document.body.style.overflow = "auto";
    navigate("/voice");
  };

  const goHome = () => {
    setShowKeywordErrModal(false);
    setShowGistListErrModal(false);
    document.body.style.overflow = "auto";
    navigate("/");
  };

  return (
    <>
      <div className="px-5 h-screen flex flex-col justify-between">
        <div className="absolute z-40 pt-8 -ml-1">
          <Link to="/voice">
            <IoChevronBackSharp size={24} />
          </Link>
        </div>
        <h1 className="pt-[84px] text-center font-semibold text-xl leading-8">
          {nickname ? `${nickname}` : "게스트"}님이
          <br />
          원하시는 선물은
        </h1>
        <div className="flex-center h-full mt-8 mb-9">
          <KeywordList />
        </div>
        <div>
          {showMessage && (
            <div className="w-fit text-center text-xs bg-black text-white p-1.5 px-35 rounded mb-3">
              <span>키워드가 아쉽다면 다시 불러와 보세요.</span>
            </div>
          )}
          <div className="flex-center mb-8">
            <button
              onClick={reloadKeyword}
              className="basic-button bg-white border border-black mr-2"
            >
              아니에요
            </button>
            <button
              onClick={submitKeywords}
              className="basic-button bg-black text-white"
            >
              맞아요
            </button>
          </div>
        </div>
      </div>
      {(keywordList.length === 0 || showKeywordErrModal) && (
        <div className="h-screen">
          <ConfirmModal
            isSad={true}
            title={"키워드를 불러올 수 없어요."}
            text={"더 자세히 이야기해 보세요."}
            leftBtn={goVoice}
            confirm={goHome}
            leftName={"다시 할래요"}
            rightName={"홈으로"}
          />
        </div>
      )}
      {showGistListErrModal && (
        <div className="h-screen">
          <ConfirmModal
            isSad={true}
            title={"딱 맞는 선물을 찾지 못했어요."}
            text={"더 자세히 이야기해 보세요."}
            leftBtn={goVoice}
            confirm={goHome}
            leftName={"다시 할래요"}
            rightName={"홈으로"}
          />
        </div>
      )}
    </>
  );
};

export default KeywordListPage;

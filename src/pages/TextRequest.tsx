import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  isKeywordLoadingState,
  keywordListState,
  transcriptState,
} from "../state/recoil";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import Lottie from "lottie-react";
import LottieListen from "../assets/lottie/listen.json";
import { PiArrowUpBold } from "react-icons/pi";
import DoneRequest from "../components/DoneRequest";

const TextRequest = () => {
  const [message, setMessage] = useState<string>("");
  const [isDoneRequest, setIsDoneRequest] = useState(false);
  const setIsKeywordLoading = useSetRecoilState(isKeywordLoadingState);
  const setKeywordList = useSetRecoilState(keywordListState);
  const setTranscript = useSetRecoilState(transcriptState);
  const navigate = useNavigate();

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 200) {
      setMessage(e.target.value);
    }
  };

  const submitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(message);
    setTranscript(message);
    setIsKeywordLoading(true);
    setIsDoneRequest(true);
    axios
      .get(`/api/api/v1/ai/parsing/keyword?text=${message}`)
      .then((res) => {
        // console.log("Response:", res.data);
        console.log("keywordList: ", res.data.data.keywordList);
        setKeywordList(res.data.data.keywordList);
        setIsKeywordLoading(false);
      })
      .catch((err) => {
        console.error("keywordList Error:", err);
        setTranscript("");
        setIsKeywordLoading(false);
      });
    setTimeout(() => {
      navigate("/keyword");
    }, 2000);
  };

  const isEmpty = message.trim() === "";

  return (
    <div className="relative full-height w-full m-auto px-5">
      {isDoneRequest ? (
        <DoneRequest transcript={message} />
      ) : (
        <>
          <div>
            <div className="absolute z-40 pt-8 -ml-1">
              <Link to="/voice">
                <IoChevronBackSharp size={24} />
              </Link>
            </div>
            <div className="pt-8">
              <div className="w-full flex justify-center -mb-4">
                <Lottie
                  className="w-[120px] h-[120px]"
                  animationData={LottieListen}
                />
              </div>
              <div className="flex-center pt-3.5">
                <div className="flex-center w-[296px] h-7 bg-white border rounded-full border-orange-200">
                  <span className="text-sm text-orange-500">
                    이야기를 작성해서 전송해주세요.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-full">
            <div className="absolute bottom-[128px] right-[20px] min-w-[68px] bg-gray-300 py-[3px] rounded-full text-center">
              <span className="text-gray-600 text-xs font-medium">
                {message.length}/200
              </span>
            </div>
            <form
              className="flex items-center justify-between px-4"
              onSubmit={(e) => submitRequest(e)}
            >
              <div className="flex-center w-full">
                <textarea
                  value={message}
                  className="w-full py-2 pl-3 pr-11 leading-6 min-h-[87px] mb-8 focus:outline-none rounded-2xl resize-none overflow-y-auto"
                  onChange={(e) => onChangeText(e)}
                  placeholder="어떤 스타일, 어떤 관계인가요? (최대 200자)"
                />
                <button
                  type="submit"
                  className={`absolute right-[30px] w-[34px] h-[34px] flex items-center justify-center -mr-2 -mb-2.5 rounded-full ${
                    isEmpty
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-black text-white"
                  }`}
                  disabled={isEmpty}
                >
                  <PiArrowUpBold size={20} />
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default TextRequest;

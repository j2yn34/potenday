import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { keywordListState } from "../state/recoil";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import Lottie from "lottie-react";
import LottieListen from "../assets/lottie/listen.json";
import { PiArrowUpBold } from "react-icons/pi";
import DoneRequest from "../components/DoneRequest";

const TesxRequest = () => {
  const [message, setMessage] = useState<string>("");
  const [textareaHeight, setTextareaHeight] = useState<string>("auto");
  const [isDoneRequest, setIsDoneRequest] = useState(false);
  const setKeywordList = useSetRecoilState(keywordListState);
  const navigate = useNavigate();

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaLineHeight = 24;
    const maxRows = 4;

    e.target.rows = 1;
    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      setTextareaHeight(`${textareaLineHeight * maxRows}px`);
    } else {
      e.target.rows = currentRows;
      setTextareaHeight("auto");
    }
  };

  const submitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(message);
    setIsDoneRequest(true);
    axios
      .get(`/api/api/v1/ai/parsing/keyword?text=${message}`)
      .then((res) => {
        console.log("Response:", res.data);
        setKeywordList(res.data.data.keywordList);
        console.log("keywordList: ", res.data.data.keywordList);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
    setTimeout(() => {
      navigate("/keyword");
    }, 2000);
  };

  return (
    <div className="relative h-screen w-full m-auto px-5 -ml-1">
      {isDoneRequest ? (
        <DoneRequest transcript={message} />
      ) : (
        <>
          <>
            <div>
              <div className="absolute z-40 pt-8">
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
            <div className="mx-auto min-w-[320px] max-w-72 my-6 px-7 overflow-y-auto">
              <p className="text-center text-gray-600 font-medium leading-7">
                {message}
              </p>
            </div>
          </>
          <div className="absolute bottom-0 right-0 w-full -mr-1">
            <form
              className="flex items-center justify-between px-4 bg-black"
              onSubmit={(e) => submitRequest(e)}
            >
              <div className="flex-center w-full">
                <textarea
                  value={message}
                  className="w-full p-2 pr-12 text-sm min-h-[42px] my-2 focus:outline-none rounded-lg resize-none overflow-y-auto"
                  onChange={(e) => {
                    onChangeText(e);
                    handleInput(e);
                  }}
                  style={{ height: textareaHeight }}
                  placeholder="어떤 스타일, 어떤 관계인가요? (최대 200자)"
                  rows={1}
                />
                <button
                  type="submit"
                  className="w-[58px] h-[58px] text-white flex items-center justify-center -mr-2"
                >
                  <PiArrowUpBold size={24} />
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default TesxRequest;

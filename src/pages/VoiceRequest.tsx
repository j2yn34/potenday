import Lottie from "lottie-react";
import LottieListen from "../assets/lottie/listen.json";
import { GrPowerReset } from "react-icons/gr";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { PiMicrophoneFill } from "react-icons/pi";
import { MdOutlinePause } from "react-icons/md";
import { IoChevronBackSharp } from "react-icons/io5";
import RequestGuide from "../components/RequestGuide";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import KeyboardBtn from "../components/buttons/KeyboardBtn";
import DoneRequest from "../components/DoneRequest";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import {
  isKeywordLoadingState,
  keywordListState,
  transcriptState,
} from "../state/recoil";
import timerIcon from "../assets/icons/timer.png";
import bubble from "../assets/images/bubble.png";

const VoiceRequest = () => {
  const [isVoiceRequest, setIsVoiceRequest] = useState<boolean>(false);
  const [isDoneRequest, setIsDoneRequest] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [lastTranscript, setLastTranscript] = useState("");
  const [noInputWarning, setNoInputWarning] = useState(false);
  const setIsKeywordLoading = useSetRecoilState(isKeywordLoadingState);

  const setTranscript = useSetRecoilState(transcriptState);
  const setKeywordList = useSetRecoilState(keywordListState);

  const navigate = useNavigate();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setTimer((prevTimer) => prevTimer);
    } else {
      setIsVoiceRequest(true);
      SpeechRecognition.startListening({ continuous: true, language: "ko-KR" });
      setTimer((prevTimer) => (prevTimer !== null ? prevTimer : 60));
    }
  };

  useEffect(() => {
    if (timer === null || timer === 0 || !listening) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, listening]);

  useEffect(() => {
    if (timer === 0) {
      submitRequest();
    }
  }, [timer]);

  useEffect(() => {
    if (!listening) return;

    const checkTranscript = setInterval(() => {
      if (transcript === lastTranscript) {
        setNoInputWarning(true);
      } else {
        setNoInputWarning(false);
      }
      setLastTranscript(transcript);
    }, 5000);

    return () => clearInterval(checkTranscript);
  }, [transcript, lastTranscript, listening]);

  useEffect(() => {
    if (transcript !== lastTranscript) {
      setNoInputWarning(false);
    }
  }, [transcript, lastTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>브라우저가 음성 인식을 지원하지 않습니다.</span>;
  }

  const submitRequest = () => {
    // console.log(transcript);
    SpeechRecognition.stopListening();
    setIsKeywordLoading(true);
    setIsDoneRequest(true);
    axios
      .get(`/api/api/v1/ai/parsing/keyword?text=${transcript}`)
      .then((res) => {
        setTranscript(transcript);
        // console.log("submit Response:", res.data);
        setKeywordList(res.data.data.keywordList);
        setIsKeywordLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setIsKeywordLoading(false);
        setTranscript("");
        navigate("/keyword");
      });
    setTimeout(() => {
      navigate("/keyword");
    }, 2000);
  };

  const goHome = () => {
    SpeechRecognition.stopListening();
    setTranscript("");
    navigate("/");
  };

  const handleReset = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    setTranscript("");
    setTimer(null);
    setIsVoiceRequest(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(1, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes} : ${seconds}`;
  };

  const isTranscriptEmpty = transcript.trim() === "";

  return (
    <div className="px-5 full-height flex flex-col justify-between">
      {isDoneRequest ? (
        <DoneRequest transcript={transcript} />
      ) : (
        <>
          {isVoiceRequest ? (
            <>
              <div>
                <button
                  className="absolute z-40 pt-8 -ml-1"
                  onClick={goHome}
                  aria-label="홈으로 가기"
                >
                  <IoChevronBackSharp size={24} />
                </button>
                <div className="pt-8">
                  <div className="w-full flex justify-center -mb-4">
                    <Lottie
                      className="w-[120px] h-[120px]"
                      animationData={LottieListen}
                    />
                  </div>
                  <h1 className="text-center font-semibold text-xl leading-8">
                    TIFY가 듣고 있어요 ..
                  </h1>
                  <div className="relative flex-center pt-3.5">
                    <img
                      src={bubble}
                      className="absolute top-[4px] w-[14px] h-[17px]"
                    />
                    <div className="flex-center w-[296px] h-7 bg-white border rounded-full border-orange-200">
                      <span className="text-sm text-orange-500">
                        이야기를 끝내셨다면 완료 버튼을 눌러주세요.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto min-w-[320px] max-w-72 my-6 px-7 overflow-y-auto">
                <p className="text-center text-gray-600 font-medium leading-7">
                  {transcript}
                </p>
                {noInputWarning && (
                  <p className="text-center text-gray-600 font-medium leading-7">
                    마이크 상태를 확인하고
                    <br />
                    다시 이야기해 주세요.
                  </p>
                )}
              </div>
            </>
          ) : (
            <RequestGuide />
          )}
          <div className="pb-8">
            <div className="w-full flex-center">
              {timer === null ? (
                <KeyboardBtn />
              ) : (
                <div className="w-[90px] py-1.5 bg-purple-100 rounded-full mb-5">
                  <span className="flex-center gap-[6px] text-center text-sm font-bold">
                    <img src={timerIcon} className="w-[18px] h-[18px]" />
                    {formatTime(timer)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-center">
              <div className="flex-center gap-9">
                <button
                  className={`round-btn ${
                    isTranscriptEmpty ? "hidden" : "bg-white flex-center "
                  }`}
                  onClick={handleReset}
                  aria-label="리셋"
                >
                  <GrPowerReset size={20} />
                </button>
                <button
                  className="w-[100px] h-16 rounded-full bg-black flex-center text-white"
                  onClick={toggleListening}
                  aria-label={listening ? "음성인식 일시정지" : "음성인식 시작"}
                >
                  {listening ? (
                    <MdOutlinePause size={32} />
                  ) : (
                    <PiMicrophoneFill size={32} />
                  )}
                </button>
                <button
                  className={`round-btn text-sm ${
                    isTranscriptEmpty ? "hidden" : "bg-white"
                  }`}
                  onClick={submitRequest}
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VoiceRequest;

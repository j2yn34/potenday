import Lottie from "lottie-react";
import LottieListen from "../assets/lottie/listen.json";
import { Link } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { PiMicrophoneFill } from "react-icons/pi";
import { MdOutlinePause } from "react-icons/md";
import { IoChevronBackSharp } from "react-icons/io5";
import RequestGuide from "../components/RequestGuide";
import { useState } from "react";
import { useNavigate } from "react-router";
import KeyboardBtn from "../components/buttons/KeyboardBtn";
import DoneRequest from "../components/DoneRequest";

const VoiceRequest = () => {
  const [isVoiceRequest, setIsVoiceRequest] = useState<boolean>(false);
  const [isDoneRequest, setIsDoneRequest] = useState(false);
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
    } else {
      setIsVoiceRequest(true);
      SpeechRecognition.startListening({ continuous: true, language: "ko-KR" });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>브라우저가 음성 인식을 지원하지 않습니다.</span>;
  }

  const submitRequest = () => {
    console.log(transcript);
    setIsDoneRequest(true);
    setTimeout(() => {
      navigate("/keyword");
    }, 2000);
  };

  return (
    <div className="px-5 h-screen flex flex-col justify-between">
      {isDoneRequest ? (
        <DoneRequest transcript={transcript} />
      ) : (
        <>
          {isVoiceRequest ? (
            <>
              <div>
                <div className="absolute z-40 pt-8 -ml-1">
                  <Link to="/">
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
                  <h1 className="text-center font-semibold text-xl leading-8">
                    TIFY가 듣고 있어요 ..
                  </h1>
                  <div className="flex-center pt-3.5">
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
              </div>
            </>
          ) : (
            <RequestGuide />
          )}
          <div className="pb-8">
            <div className="w-full flex-center">
              <KeyboardBtn />
            </div>
            <div className="flex-center">
              <div className="flex-center gap-9">
                <button
                  className="round-btn flex-center"
                  onClick={resetTranscript}
                >
                  <GrPowerReset size={20} />
                </button>
                <button
                  className="w-[100px] h-16 rounded-full bg-black flex-center text-white"
                  onClick={toggleListening}
                >
                  {listening ? (
                    <MdOutlinePause size={32} />
                  ) : (
                    <PiMicrophoneFill size={32} />
                  )}
                </button>
                <button className="round-btn text-sm" onClick={submitRequest}>
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

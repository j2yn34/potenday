import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const App = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "ko-KR" });
  const stopListening = () => SpeechRecognition.stopListening();

  if (!browserSupportsSpeechRecognition) {
    return <span>브라우저가 음성 인식을 지원하지 않습니다.</span>;
  }

  return (
    <div className="prose p-4">
      <h2>음성 인식 & 텍스트로 변환 테스트!!</h2>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={startListening}
          disabled={listening}
        >
          말하기
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={stopListening}
          disabled={!listening}
        >
          일시정지
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetTranscript}
        >
          Reset
        </button>
      </div>

      <div>
        <h3>텍스트 변환</h3>
        <div className="border w-96 h-40 rounded">
          <p>{transcript}</p>
        </div>
      </div>
    </div>
  );
};

export default App;

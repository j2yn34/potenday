import { PiMicrophoneFill } from "react-icons/pi";

const MicButton = () => {
  return (
    <button className="w-[100px] h-16 rounded-full bg-black flex-center text-white">
      <PiMicrophoneFill size={32} />
    </button>
  );
};

export default MicButton;

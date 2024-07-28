import { Link } from "react-router-dom";
import { TbKeyboard } from "react-icons/tb";

const KeyboardBtn = () => {
  return (
    <Link
      to="/text"
      className="flex-center w-40 py-1.5 mb-5 bg-white rounded-full"
    >
      <div className="pr-2">
        <TbKeyboard />
      </div>
      <span className="text-sm">텍스트로 입력하기</span>
    </Link>
  );
};

export default KeyboardBtn;

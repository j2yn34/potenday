import sad from "../../assets/images/sad.svg";
import caution from "../../assets/images/caution.svg";

const ConfirmModal = ({
  isSad,
  title,
  text,
  leftBtn,
  confirm,
  leftName,
  rightName,
}: {
  isSad: boolean;
  title: string;
  text: string;
  leftBtn: () => void;
  confirm: () => void;
  leftName: string;
  rightName: string;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/[0.8] z-50">
      <div className="flex flex-col max-w-[320px] w-full h-fit rounded-xl bg-white z-50 p-5">
        <div className="flex flex-col justify-center items-center py-12">
          {isSad ? <img src={sad} /> : <img src={caution} />}
          <p className="text-xl font-semibold pt-6">{title}</p>
          <p className="text-gray-500 text-sm pt-3">{text}</p>
        </div>
        <div className="flex gap-2">
          <button
            className="basic-button bg-white border border-black"
            onClick={leftBtn}
          >
            {leftName}
          </button>
          <button
            className="basic-button bg-black text-white"
            onClick={confirm}
          >
            {rightName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

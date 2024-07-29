import sad from "../../assets/images/sad.svg";
import notice from "../../assets/images/caution.svg";
import { Link } from "react-router-dom";
import { NoticeType } from "../../type";

const Notice = ({ isSad, title, text, nav, btnName }: NoticeType) => {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center pb-28">
        {isSad ? <img src={sad} /> : <img src={notice} />}
        <div className="flex-center flex-col pt-6 gap-4">
          <span className="text-xl font-semibold">{title}</span>
          <span className="text-gray-500 text-sm">{text}</span>
        </div>
        {nav ? (
          <Link
            to={nav}
            className="min-w-fit bg-black text-white px-7 py-5 rounded-lg mt-14"
          >
            {btnName}
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Notice;

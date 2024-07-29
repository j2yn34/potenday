import { Link } from "react-router-dom";
import kakao from "../assets/images/kakao.svg";
import loginLogo from "../assets/logo/loginLogo.svg";
import { IoChevronBackSharp } from "react-icons/io5";

const LoginPage = () => {
  const url = "https://server.tify.co.kr/api/v1/oauth2/authorization/kakao";

  const loginHandler = () => {
    window.location.href = `${url}`;
  };

  return (
    <>
      <div className="relative px-5 h-screen flex flex-col justify-between p-20">
        <div className="absolute z-40 top-0 pt-8 -ml-1">
          <Link to="/">
            <IoChevronBackSharp size={24} />
          </Link>
        </div>
        <div className="flex-center mt-24">
          <img src={loginLogo} alt="TIFY 로고" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-center text-xs">
            카카오 계정으로 <br />
            빠르게 선물을 골라볼 수 있어요!
          </p>
          <button
            className="flex-center w-full h-14 bg-[#fee500] rounded-lg"
            onClick={loginHandler}
          >
            <img src={kakao} alt="카카오톡" />
            <span className="ml-2 font-semibold">카카오로 시작하기</span>
          </button>
          <Link
            to="/voice"
            className="flex-center w-full h-14 bg-black text-white rounded-lg font-semibold"
          >
            로그인없이 체험해보기
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

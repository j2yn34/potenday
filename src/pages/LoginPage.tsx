import kakao from "../assets/images/kakao.svg";
import loginLogo from "../assets/logo/loginLogo.svg";

const LoginPage = () => {
  const url = "https://server.tify.co.kr/api/v1/oauth2/authorization/kakao";

  const loginHandler = () => {
    window.location.href = `${url}`;
  };

  return (
    <>
      <div className="px-5 h-screen flex flex-col justify-between p-20">
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
          {/* <button className="flex-center w-full h-14 bg-black text-white rounded-lg font-semibold">
            로그인없이 체험해보기
          </button> */}
        </div>
      </div>
    </>
  );
};

export default LoginPage;

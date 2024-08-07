import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { accessTokenState, userInfoState } from "../state/recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IoChevronBackSharp } from "react-icons/io5";
import { UserInfoState } from "../state/recoilType";
import { useState, useCallback, ChangeEvent } from "react";

const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

const validationMessages = {
  specialCharMsg: "한글, 영문, 숫자만 입력 가능해요.",
};

const ChangeNickname = () => {
  const token = useRecoilValue<string>(accessTokenState);
  const [inputValue, setInputValue] = useState<string>("");
  const [checkMessage, setCheckMessage] = useState<string | null>(null);
  const userInfo = useRecoilValue<UserInfoState>(userInfoState);
  const setUserInfo = useSetRecoilState<UserInfoState>(userInfoState);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "post",
        url: `/api/api/v1/user`,
        data: { nickname: inputValue },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo((prev) => ({
        ...prev,
        nickname: inputValue,
      }));
      console.log(res);
    } catch (error) {
      console.error("닉네임 변경 실패: ", error);
      return;
    }
    navigate("/mypage");
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);

    if (!regExp.test(value)) {
      return setCheckMessage(validationMessages.specialCharMsg);
    }

    setCheckMessage(null);
  }, []);

  return (
    <>
      <div className="relative w-full full-height px-5 mx-auto max-w-screen-lg bg-purple-50">
        <div className="absolute z-40 pt-8 -ml-1">
          <Link to="/mypage">
            <IoChevronBackSharp size={24} />
          </Link>
        </div>
        <h1 className="mb-8 pt-8 text-center font-semibold text-xl leading-8">
          닉네임 변경
        </h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className={`px-5 font-medium w-full h-14 border border-1 border-gray-300 rounded-xl ${
              checkMessage
                ? "focus:outline-[#F82424]"
                : "focus:outline-[#4227E7]"
            }`}
            onChange={handleChange}
            placeholder={`${userInfo.nickname}`}
            value={inputValue}
            maxLength={10}
            required
          />
          <div className="flex items-center justify-between pt-2">
            <p
              className={`text-sm h-5 ${
                checkMessage ? "text-danger" : "text-gray-500"
              }`}
            >
              {checkMessage ? `${checkMessage}` : "한글, 영문, 숫자 혼용 가능"}
            </p>
            <p className="text-sm text-gray-500">{inputValue.length}/10</p>
          </div>
          <div className="fixed bottom-0 w-full max-w-[480px] -ml-5 pb-8 px-5">
            <button
              type="submit"
              className={`w-full h-14 font-semibold rounded-lg ${
                checkMessage
                  ? "bg-gray-200 text-gray-500"
                  : "bg-black text-white"
              }`}
              disabled={checkMessage !== null}
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ChangeNickname;

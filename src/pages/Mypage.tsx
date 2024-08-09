import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { Link, useNavigate } from "react-router-dom";
import {
  accessTokenState,
  onboardingState,
  userInfoState,
} from "../state/recoil";
import { IoChevronBackSharp } from "react-icons/io5";
import { UserInfoState } from "../state/recoilType";
import { IoIosArrowForward } from "react-icons/io";
import ConfirmModal from "../components/common/ConfirmModal";
import axios from "axios";

const Mypage = () => {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [token, setToken] = useRecoilState<string>(accessTokenState);
  const userInfo = useRecoilValue<UserInfoState>(userInfoState);
  const resetUserInfo = useResetRecoilState(userInfoState);
  const setOnboardingState = useSetRecoilState<boolean>(onboardingState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setOnboardingState(false);
    } else {
      navigate("/mypage");
    }
  }, []);

  const titleList = [
    { title: "최근 본 선물" },
    { title: "이용약관" },
    { title: "로그아웃" },
  ];

  const handleClick = (title: string) => {
    switch (title) {
      case "최근 본 선물":
        navigate("/history");
        break;
      case "이용약관":
        navigate("/terms");
        break;
      default:
        openModal(setShowLogoutModal);
    }
  };

  const runLogout = async () => {
    try {
      await axios({
        method: "post",
        url: "/api/api/v1/user/logout",
        headers: { Authorization: `Bearer ${token}` },
        responseType: "json",
      });
      resetUserInfo();
      setToken("");
      closeModal(setShowLogoutModal);
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      resetUserInfo();
      setToken("");
      closeModal(setShowLogoutModal);
      navigate("/");
    }
  };

  const openModal = (setFunc: Dispatch<SetStateAction<boolean>>) => {
    setFunc(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (setFunc: Dispatch<SetStateAction<boolean>>) => {
    setFunc(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="relative w-full full-height px-5 mx-auto max-w-screen-lg bg-purple-50">
        <div className="absolute z-40 pt-8 -ml-1">
          <Link to="/">
            <IoChevronBackSharp size={24} />
          </Link>
        </div>
        <h1 className="mb-8 pt-8 text-center font-semibold text-xl leading-8">
          내 정보
        </h1>
        <Link to="/myinfo">
          <div className="w-full h-[75px] bg-black rounded-xl px-5 py-3 flex items-center justify-between">
            <div>
              <div className="text-white">{userInfo.nickname}님</div>
              <span className="text-xs text-gray-400">내 정보 관리</span>
            </div>
            <IoIosArrowForward className="text-white" />
          </div>
        </Link>
        <div className="w-screen h-[6px] bg-[#E7E5F2] mt-4 -ml-5" />
        <div>
          {titleList.map((title) => (
            <div className="w-full h-14" key={title.title}>
              <button
                className="flex items-center justify-between w-full"
                onClick={() => handleClick(title.title)}
              >
                <div className="text-sm h-14 font-medium flex items-center">
                  {title.title}
                </div>
                <IoIosArrowForward className="text-gray-500" />
              </button>
              <div className="w-full h-[1px] bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
      {showLogoutModal && (
        <ConfirmModal
          isSad={false}
          title={"로그아웃 하시겠어요?"}
          text={"로그아웃 하면 이후 기록이 저장되지 않아요."}
          leftBtn={() => closeModal(setShowLogoutModal)}
          confirm={runLogout}
          leftName={"취소"}
          rightName={"확인"}
        />
      )}
    </>
  );
};

export default Mypage;

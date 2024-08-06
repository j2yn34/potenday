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
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
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
    { title: "로그아웃" },
    { title: "최근 본 선물" },
    { title: "탈퇴하기" },
  ];

  const handleClick = (title: string) => {
    switch (title) {
      case "로그아웃":
        openModal(setShowLogoutModal);
        break;
      case "최근 본 선물":
        navigate("/history");
        break;
      default:
        openModal(setShowWithdrawModal);
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

  const runWithdraw = async () => {
    try {
      await axios({
        method: "delete",
        url: "/api/api/v1/user",
        headers: { Authorization: `Bearer ${token}` },
        responseType: "json",
      });
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
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
      <div className="relative w-full full-height overflow-hidden px-5 mx-auto max-w-screen-lg">
        <div className="absolute z-40 pt-8 -ml-1">
          <Link to="/">
            <IoChevronBackSharp size={24} />
          </Link>
        </div>
        <h1 className="mb-8 pt-8 text-center font-semibold text-xl leading-8">
          내 정보
        </h1>
        <button className="w-full h-[75px] bg-black rounded-xl px-5 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white">{userInfo.nickname}님</div>
              <div>email</div>
            </div>
            <Link to="/" className="text-white">
              <IoIosArrowForward />
            </Link>
          </div>
        </button>
        <div className="w-screen h-2 bg-purple-100 mt-5 -ml-5" />
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
          text={""}
          leftBtn={() => closeModal(setShowLogoutModal)}
          confirm={runLogout}
          leftName={"취소"}
          rightName={"확인"}
        />
      )}
      {showWithdrawModal && (
        <ConfirmModal
          isSad={false}
          title={"정말 탈퇴하시겠어요?"}
          text={"회원 탈퇴하시면 모든 기록을 잃게 돼요."}
          leftBtn={() => closeModal(setShowWithdrawModal)}
          confirm={runWithdraw}
          leftName={"취소"}
          rightName={"확인"}
        />
      )}
    </>
  );
};

export default Mypage;

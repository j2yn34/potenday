import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { accessTokenState, userInfoState } from "../state/recoil";
import { useRecoilState, useResetRecoilState } from "recoil";
import ConfirmModal from "../components/common/ConfirmModal";

const MyInfo = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [token, setToken] = useRecoilState<string>(accessTokenState);
  const resetUserInfo = useResetRecoilState(userInfoState);
  const navigate = useNavigate();

  const titleList = [{ title: "닉네임 변경" }, { title: "회원 탈퇴" }];

  const handleClick = (title: string) => {
    switch (title) {
      case "닉네임 변경":
        navigate("/changeNickname");
        break;
      default:
        openModal(setShowWithdrawModal);
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
      resetUserInfo();
      setToken("");
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      return;
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
          <Link to="/mypage">
            <IoChevronBackSharp size={24} />
          </Link>
        </div>
        <h1 className="mb-8 pt-8 text-center font-semibold text-xl leading-8">
          내 정보 관리
        </h1>
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
export default MyInfo;

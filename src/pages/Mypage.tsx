import React from "react";
import { useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { accessTokenState, userInfoState } from "../state/recoil";
import { IoChevronBackSharp } from "react-icons/io5";
import { UserInfoState } from "../state/recoilType";
import { IoIosArrowForward } from "react-icons/io";

const Mypage = () => {
  const token = useRecoilValue<string>(accessTokenState);
  const userInfo = useRecoilValue<UserInfoState>(userInfoState);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate("/mypage");
    } else {
      navigate("/mypage");
    }
  }, []);

  const titleList = [
    { title: "로그아웃" },
    { title: "선물 추천 히스토리" },
    { title: "탈퇴하기" },
  ];

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden px-5 mx-auto max-w-screen-lg">
        <div className="absolute z-40 pt-8 -ml-1">
          <Link to="/">
            <IoChevronBackSharp size={24} />
          </Link>
        </div>
        <h1 className="mb-8 pt-8 text-center font-semibold text-xl leading-8">
          내 정보
        </h1>
        <div className="w-full h-[75px] bg-black rounded-xl px-5 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white">{userInfo.nickname}박지연님</div>
              <div>email</div>
            </div>
            <Link to="/" className="text-white">
              <IoIosArrowForward />
            </Link>
          </div>
        </div>
        <div className="w-screen h-2 bg-purple-100 mt-5 -ml-5" />
        <div>
          {titleList.map((title) => (
            <div className="w-full h-14" key={title.title}>
              <button className="flex items-center justify-between w-full">
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
    </>
  );
};

export default Mypage;

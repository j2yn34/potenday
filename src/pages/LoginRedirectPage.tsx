import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accessTokenState, userInfoState } from "../state/recoil";
import { useSetRecoilState } from "recoil";
import { UserInfoState } from "../state/recoilType";
import axios from "axios";

const LoginRedirectPage = () => {
  const setAccessToken = useSetRecoilState<string>(accessTokenState);
  const setUserInfo = useSetRecoilState<UserInfoState>(userInfoState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);

  useEffect(() => {
    const token = new URL(window.location.href).searchParams.get("accessToken");

    const getUserInfo = async (token: string) => {
      try {
        const response = await axios({
          method: "get",
          url: "/api/api/v1/user",
          headers: { Authorization: `Bearer ${token}` },
          responseType: "json",
        });
        console.log(token, response.data);

        const { id, nickname } = response.data.data;
        setUserInfo({ id, nickname });
        sessionStorage.setItem("hasSeenSplash", "true");
        navigate("/");
      } catch (error) {
        console.error(error);
      }
      return;
    };

    if (token) {
      setIsLoading(false);
      setAccessToken(token);
      getUserInfo(token);
      setShowWelcomeModal(true);
    } else {
      setIsLoading(false);
      setShowErrorModal(true);
    }
  }, [navigate, setAccessToken, setUserInfo]);

  return (
    <>
      {isLoading ? (
        <div>
          <span className="flex mx-auto loading loading-spinner loading-md text-gray/[0.2]"></span>
        </div>
      ) : (
        <>{showErrorModal && <div>로그인 실패</div>}</>
      )}
      {showWelcomeModal && <div>로그인 완료</div>}
    </>
  );
};

export default LoginRedirectPage;

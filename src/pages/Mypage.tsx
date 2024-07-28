import React from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { accessTokenState } from "../state/recoil";
import Lottie from "lottie-react";
import Lottieloading from "../assets/lottie/loading.json";

const Mypage = () => {
  const token = useRecoilValue<string>(accessTokenState);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (token) {
      navigate("/preparing");
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <Lottie animationData={Lottieloading} />
    </>
  );
};

export default Mypage;

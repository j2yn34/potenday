import React from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { accessTokenState } from "../state/recoil";

const Mypage = () => {
  const token = useRecoilValue<string>(accessTokenState);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/preparing");
    }
  }, []);

  return <></>;
};

export default Mypage;

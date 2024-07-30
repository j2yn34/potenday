import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import LoginRedirectPage from "./pages/LoginRedirectPage";
import NotFoundPage from "./pages/NotFoundPage";
import VoiceRequest from "./pages/VoiceRequest";
import Mypage from "./pages/Mypage";
import MyHeartListPage from "./pages/MyHeartListPage";
import TextRequest from "./pages/TextRequest";
import KeywordListPage from "./pages/KeywordListPage";
import GiftListPage from "./pages/GiftListPage";
import PreparingPage from "./pages/PreparingPage";
import MicTest from "./test/MicTest";
import LottieTest from "./test/LottieTest";
import SplashScreen from "./pages/SplashScreen";
import { useEffect, useState } from "react";

const Router = (): JSX.Element => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      {showSplash ? (
        <Route
          path="/"
          element={<SplashScreen setShowSplash={setShowSplash} />}
        />
      ) : (
        <Route path="/" element={<Index />} />
      )}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth2/callback" element={<LoginRedirectPage />} />
      <Route path="/voice" element={<VoiceRequest />} />
      <Route path="/text" element={<TextRequest />} />
      <Route path="/keyword" element={<KeywordListPage />} />
      <Route path="/giftlist" element={<GiftListPage />} />
      <Route path="/heartlist" element={<MyHeartListPage />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/preparing" element={<PreparingPage />} />
      <Route path="/speech" element={<MicTest />} />
      <Route path="/lottie" element={<LottieTest />} />
    </Routes>
  );
};

export default Router;

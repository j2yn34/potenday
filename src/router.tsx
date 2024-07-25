import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFoundPage from "./pages/NotFoundPage";
import RequestFor from "./pages/RequestFor";
import HeartListPage from "./pages/HeartListPage";
import Mypage from "./pages/Mypage";
import SpeechRec from "./test/SpeechRec";
import LottieTest from "./test/LottieTest";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<Index />} />
      <Route path="/request" element={<RequestFor />} />
      <Route path="/heartlist" element={<HeartListPage />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/speech" element={<SpeechRec />} />
      <Route path="/lottie" element={<LottieTest />} />
    </Routes>
  );
};

export default Router;

import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFoundPage from "./pages/NotFoundPage";
import SpeechRec from "./test/SpeechRec";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<Index />} />
      <Route path="/speech" element={<SpeechRec />} />
    </Routes>
  );
};

export default Router;

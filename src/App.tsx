import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import useViewportHeight from "./hooks/useViewportHeight";
import { useEffect } from "react";

const App = () => {
  const vh = useViewportHeight();

  useEffect(() => {
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [vh]);

  return (
    <BrowserRouter>
      <div className="full-height">
        <Router />
      </div>
    </BrowserRouter>
  );
};

export default App;

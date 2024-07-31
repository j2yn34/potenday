import { useState, useEffect } from "react";

const useViewportHeight = () => {
  const [vh, setVh] = useState<number>(window.innerHeight * 0.01);

  useEffect(() => {
    const updateViewportHeight = () => {
      setVh(window.innerHeight * 0.01);
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);

    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  return vh;
};

export default useViewportHeight;

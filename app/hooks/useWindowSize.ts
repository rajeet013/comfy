import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [dimensions, setDimensions] = useState({ width: 350, height: 350 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 604) {
        setDimensions({ width: 350, height: 350 });
      } else {
        setDimensions({ width: 400, height: 400 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};
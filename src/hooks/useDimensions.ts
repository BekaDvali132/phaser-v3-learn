import { useEffect, useState } from "react";

export const PLINKO_GAME_WIDTH = 1440;
export const PLINKO_GAME_HEIGHT = 955;

export const calculateDimensions = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return { width, height };
};

const useDimensions = () => {
  const [dimensions, setDimensions] = useState(() => calculateDimensions());

  useEffect(() => {
    const handleResize = () => setDimensions(calculateDimensions());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};

export default useDimensions;

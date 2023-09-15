import { useLocation } from "react-router-dom";

export const useIsHidden = () => {
  const location = useLocation();
  const isHidden = location.pathname.includes("hidden");

  return isHidden;
};

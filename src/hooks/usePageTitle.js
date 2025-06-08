import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Marathon Zone`;
  }, [title]);
};

export default usePageTitle;

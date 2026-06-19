import { useEffect } from "react";
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.classList.add("modal-open");
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.style.paddingRight = "";
    };
  }, [isLocked]);
}

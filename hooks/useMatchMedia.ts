import { useState, useEffect } from "react";

export function useMatchMedia({ breakPoint }: { breakPoint: number }) {
  const [isMatch, setIsMatch] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakPoint - 1}px)`);
    const onChange = () => {
      setIsMatch(window.innerWidth < breakPoint);
    };
    mql.addEventListener("change", onChange);
    setIsMatch(window.innerWidth < breakPoint);
    return () => mql.removeEventListener("change", onChange);
  }, [breakPoint]);

  return !!isMatch;
}

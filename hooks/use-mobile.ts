import { useMatchMedia } from "./useMatchMedia";
import { BREAK_POINTS } from "../utils/breakPoints";

export function useIsMobile() {
  const isMatched = useMatchMedia({ breakPoint: BREAK_POINTS.md });
  return !!isMatched;
}

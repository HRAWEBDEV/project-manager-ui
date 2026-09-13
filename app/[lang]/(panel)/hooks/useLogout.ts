import { useCallback } from "react";
import { useLogout as useAuthLogout } from "../../(auth)/hooks/useAuth";

export function useLogout() {
  const confirmLogout = useAuthLogout();

  const logout = useCallback(() => {
    confirmLogout.mutate();
  }, [confirmLogout]);

  return {
    logout,
    isPending: confirmLogout.isPending,
  };
}

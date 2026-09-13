import { useLogout as useAuthLogout } from "../../(auth)/hooks/useAuth";

export function useLogout() {
  const confirmLogout = useAuthLogout();

  const logout = confirmLogout.mutate;

  return {
    logout,
    isPending: confirmLogout.isPending,
  };
}

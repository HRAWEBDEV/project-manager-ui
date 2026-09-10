"use client";
import { useState, ReactNode } from "react";
import { type SettingsContextProps, SettingsContext } from "./settingsContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { IoIosWarning } from "react-icons/io";
import { useLogout } from "../../hooks/useLogout";

export default function SettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const logout = useLogout();
  const {
    shareDictionary: {
      components: { settings: dic },
    },
  } = useShareDictionary();
  const [open, setOpen] = useState(false);
  const [showConfirmLogout, setShowConfirmlogout] = useState(false);

  function onToggle(state?: boolean) {
    setOpen((pre) => (state === undefined ? !pre : state));
  }

  const ctx: SettingsContextProps = {
    open,
    showConfirmLogout,
    setShowConfirmlogout,
    toggleOpen: onToggle,
  };
  return (
    <SettingsContext.Provider value={ctx}>
      {children}
      <AlertDialog
        open={showConfirmLogout}
        onOpenChange={(state) => setShowConfirmlogout(state)}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <IoIosWarning />
            </AlertDialogMedia>
            <AlertDialogTitle>{dic.logoutConfirmMessage}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">
              {dic.cancel}
            </AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={() => logout()}>
              {dic.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SettingsContext.Provider>
  );
}

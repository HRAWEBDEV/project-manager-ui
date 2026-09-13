import { ReactNode } from "react";

export default function MainWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 grow overflow-auto">
      {children}
    </div>
  );
}

"use client";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { BREAK_POINTS } from "@/utils/breakPoints";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaHouse } from "react-icons/fa6";

export default function TabsNav() {
  const isMatched = useMatchMedia({ breakPoint: BREAK_POINTS.md });
  return (
    <>
      {isMatched ? (
        <nav className="fixed bottom-0 inset-e-0 inset-s-0">
          <Tabs>
            <TabsList className="w-full rounded-none h-auto!">
              <TabsTrigger
                value="tab1"
                className="basis-0 grow flex-col h-auto gap-px p-px"
              >
                <FaHouse className="size-5" />
                <span className="text-sm">خـــانه</span>
              </TabsTrigger>
              <TabsTrigger
                value="tab2"
                className="basis-0 grow flex-col h-auto gap-px p-px"
              >
                <FaHouse className="size-5" />
                <span className="text-sm">خـــانه</span>
              </TabsTrigger>
              <TabsTrigger
                value="tab3"
                className="basis-0 grow flex-col h-auto gap-px p-px"
              >
                <FaHouse className="size-5" />
                <span className="text-sm">خـــانه</span>
              </TabsTrigger>
              <TabsTrigger
                value="tab4"
                className="basis-0 grow flex-col h-auto gap-px p-px"
              >
                <FaHouse className="size-5" />
                <span className="text-sm">خـــانه</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </nav>
      ) : null}
    </>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { useThrottledCallback } from "@tanstack/react-pacer";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

type ScrollDirection = "up" | "down";

export default function MainWrapper({ children }: { children: ReactNode }) {
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");
  const [scrollTop, setScrollTop] = useState<number>(0);

  const debouncer = useThrottledCallback(
    () => {
      if (!mainWrapperRef.current) return;
      const newScrollTop = mainWrapperRef.current.scrollTop;
      const scrollOffset = newScrollTop - scrollTop;
      let newScrollDirection: ScrollDirection = "up";
      if (newScrollTop && Math.abs(scrollOffset) < 120) {
        return;
      }
      if (newScrollTop === 0 || scrollOffset < 0) {
        newScrollDirection = "up";
      } else {
        newScrollDirection = "down";
      }
      document.documentElement.setAttribute(
        "data-scroll-dicretion",
        newScrollDirection,
      );
      setScrollDirection(newScrollDirection);
      setScrollTop(newScrollTop);
    },
    {
      wait: 500,
    },
  );

  function scrollToTop() {
    if (!mainWrapperRef.current) return;
    mainWrapperRef.current.scrollTop = 0;
  }
  useEffect(() => {
    if (!mainWrapperRef.current) return;
    const abortController = new AbortController();
    document.documentElement.setAttribute("data-scroll-dicretion", "up");
    mainWrapperRef.current!.addEventListener(
      "scroll",
      () => {
        debouncer();
      },
      {
        signal: abortController.signal,
      },
    );
    return () => {
      abortController.abort();
    };
  }, [mainWrapperRef, debouncer]);

  return (
    <div
      ref={mainWrapperRef}
      data-main-container
      className="flex flex-1 flex-col gap-4 grow overflow-auto pb-(--panel-tab-height) in-data-[scroll-dicretion='down']:pb-4 md:pb-0 scroll-smooth"
    >
      {children}
      {scrollTop > 200 && (
        <div className='fixed z-(--panel-tab-zindex) inset-e-4 bottom-(--panel-tab-height) lg:bottom-2 in-data-[scroll-dicretion="down"]:bottom-2'>
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => {
              if (!mainWrapperRef.current) return;
              mainWrapperRef.current.scrollTop = 0;
            }}
          >
            <FaArrowAltCircleUp className="size-10 text-neutral-700 dark:text-neutral-400" />
          </Button>
        </div>
      )}
    </div>
  );
}

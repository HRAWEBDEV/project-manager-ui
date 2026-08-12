"use client";
import { cn } from "@/lib/utils";
import { useThrottledCallback } from "@tanstack/react-pacer";
import { ComponentProps, useRef, useState, useEffect } from "react";

type ScrollDirection = "up" | "down";

export default function MainWrapper({
  className,
  ...props
}: ComponentProps<"main">) {
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
    <main
      ref={mainWrapperRef}
      data-slot="sidebar-inset"
      className={cn(
        'relative flex w-full flex-1 flex-col bg-neutral-100 dark:bg-neutral-900 scroll-smooth pb-(--panel-tabs-height) in-data-[scroll-dicretion="down"]:pb-4 sm:pb-0',
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className,
      )}
      {...props}
    />
  );
}

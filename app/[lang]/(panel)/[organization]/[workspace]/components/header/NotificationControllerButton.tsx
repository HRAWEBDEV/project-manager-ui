"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoMdNotifications } from "react-icons/io";

export default function NotificationControllerButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      className="relative rounded-full text-destructive"
    >
      <div className="absolute top-0 -inset-e-1">
        <Badge
          style={{
            direction: "ltr",
          }}
          variant="destructive"
          className="p-1 rounded-full size-5 font-en-roboto"
        >
          +99
        </Badge>
      </div>
      <IoMdNotifications className="size-5" />
    </Button>
  );
}

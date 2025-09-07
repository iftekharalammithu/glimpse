"use client";
import { getNotification } from "@/Actions/User";
import { AvatarFallback } from "@/components/ui/avatar";
import { useQueryData } from "@/hook/usequeryData";
import { Avatar } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import * as React from "react";

export default function Page() {
  const { data: notification } = useQueryData(
    ["user-notification"],
    getNotification
  );

  const { data: notifications, status } = notification as {
    status: number;
    data: {
      notification: {
        id: string;
        userId: string;
        content: string;
      }[];
    };
  };
  if (status !== 200) {
    <div className=" flex justify-center items-center h-full w-full">
      <p>No Notification</p>
    </div>;
  }
  return (
    <div className=" flex flex-col">
      {notifications.notification.map((n) => (
        <div
          key={n.id}
          className=" border-2 flex gap-x-3 items-center rounded-lg p-3"
        >
          <Avatar>
            <AvatarFallback>
              <User></User>
            </AvatarFallback>
          </Avatar>
          <p>{n.content}</p>
        </div>
      ))}
    </div>
  );
}

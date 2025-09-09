"use client";
import { WorkSpace } from "@prisma/client";
import { usePathname } from "next/navigation";
import React from "react";

type GlobalHeaderProps = {
  workspace: WorkSpace;
};

const GlobalHeader = ({ workspace }: GlobalHeaderProps) => {
  const pathname = usePathname().split(`/dashboard/${workspace.id}`)[1];
  return (
    <div className=" flex  flex-col gap-2">
      <span className="  text-gray-400 text-xs">
        {workspace.type.toLocaleUpperCase()}
      </span>
      <h1 className=" text-4xl">
        {pathname && !pathname.includes("folder") && !pathname.includes("video")
          ? pathname.charAt(1).toUpperCase() + pathname.slice(2).toLowerCase()
          : pathname.includes("video")
          ? ""
          : "My Library"}
      </h1>
    </div>
  );
};

export default GlobalHeader;

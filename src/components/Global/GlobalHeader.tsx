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
    <div className=" flex flex-col gap-2">
      <span className="  text-gray-400 text-xs">
        {workspace.type.toLocaleUpperCase()}
      </span>
      <h1 className=" text-4xl">
        {pathname && !pathname.includes("folder")
          ? !pathname.charAt(0).toUpperCase() + pathname.slice(1).toLowerCase()
          : ""}
      </h1>
    </div>
  );
};

export default GlobalHeader;

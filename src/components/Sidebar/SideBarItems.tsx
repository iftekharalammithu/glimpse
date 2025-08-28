import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";

type SideBarItemsProps = {
  icon: ReactNode;
  title: string;
  href: string;
  selected: boolean;
  notification?: number;
};

const SideBarItems = ({
  icon,
  title,
  href,
  selected,
  notification,
}: SideBarItemsProps) => {
  return (
    <li className=" cursor-pointer my-[5px]">
      <Link
        className={cn(
          " flex items-center justify-between group rounded-lg  hover:bg-[#1D1D1D]",
          selected ? " bg-[#1D1D1D]" : ""
        )}
        href={href}
      >
        <div className=" flex  items-center gap-2 transition-all p-1 cursor-pointer">
          <div
            className={cn(selected && "text-text2", "group-hover:text-text2")}
          >
            {icon}
          </div>
          <span
            className={cn(
              "font-medium group-hover:text-text2  transition-all truncate w-32",
              selected ? " text-text2" : "text-[#545454]"
            )}
          >
            {title}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default SideBarItems;

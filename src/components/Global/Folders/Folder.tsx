"use client";
import { cn } from "@/lib/utils";
import { FolderClosed, Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type FolderProps = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ name, id, optimistic, count }: FolderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleFolderClick = () => {
    router.push(`${pathname}/folder/${id}`);
  };
  return (
    <div
      onClick={() => handleFolderClick}
      className={cn(
        "flex cursor-pointer items-center justify-between gap-2 rounded-lg border-[1px] min-w-[250px] py-4 px-4 transition duration-150 hover:bg-neutral-800"
      )}
    >
      {false ? (
        <Loader2 className=" animate-spin"></Loader2>
      ) : (
        <div className=" flex justify-between w-full items-center">
          <div className=" flex flex-col gap-[1px]">
            <p className=" text-neutral-300">{name}</p>
            <span className=" text-sm text-neutral-500 ">
              {count || 0} Videos
            </span>
          </div>
          <FolderClosed></FolderClosed>
        </div>
      )}
    </div>
  );
};

export default Folder;

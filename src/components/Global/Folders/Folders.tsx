import { cn } from "@/lib/utils";
import { ArrowRight, FolderCode } from "lucide-react";
import React from "react";
import Folder from "./Folder";

interface FoldersProps {
  workspaceId: string;
}

const Folders = ({ workspaceId }: FoldersProps) => {
  return (
    <div className=" flex flex-col gap-4">
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-4">
          <FolderCode></FolderCode>
          <h2 className=" text-gray-200 text-xl">Folders</h2>
        </div>
        <div className=" flex items-center gap-2">
          <p className=" text-gray-200 border-gray-500 px-2 border rounded-full">
            See All
          </p>
          <ArrowRight className=" text-gray-400"></ArrowRight>
        </div>
      </div>
      <section className={cn(" flex items-center gap-4  overflow-auto w-full")}>
        <Folder name="Folder Title"></Folder>
      </section>
    </div>
  );
};

export default Folders;

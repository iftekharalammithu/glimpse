"use client";
import React from "react";
import { Button } from "../ui/button";
import { FolderPlus } from "lucide-react";
import { useCreateFolders } from "@/hook/useCreateFolders";

interface CreateFoldersProps {
  workspaceId: string;
}

const CreateFolders = ({ workspaceId }: CreateFoldersProps) => {
  const { onCreateNewfolder } = useCreateFolders(workspaceId);

  return (
    <Button
      onClick={onCreateNewfolder}
      className=" bg-black text-gray-300 flex items-center gap-2 px-4  py-6 rounded-2xl"
    >
      <FolderPlus></FolderPlus>
      Create A Folder
    </Button>
  );
};

export default CreateFolders;

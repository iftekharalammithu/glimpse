"use client";
import { getFolderInfo } from "@/Actions/Workspace";
import { useQueryData } from "@/hook/usequeryData";
import React from "react";
import { FolderProps } from "@/types/page";

type FolderInfoProps = {
  folderId: string;
};

const FolderInfo = ({ folderId }: FolderInfoProps) => {
  const { data, isFetched } = useQueryData(["folder-info"], () =>
    getFolderInfo(folderId)
  );
  const { data: folder } = data as FolderProps;
  return (
    <div className=" flex items-center">
      <h2 className=" text-gray-500 text-2xl">{folder.name}</h2>
    </div>
  );
};

export default FolderInfo;

"use client";
import { cn } from "@/lib/utils";
import { ArrowRight, FolderCode } from "lucide-react";
import React from "react";
import Folder from "./Folder";
import { useQueryData } from "@/hook/usequeryData";
import { getWorkspaceFolder } from "@/Actions/Workspace";
import { useMutationData, useMutationDataState } from "@/hook/useMutationData";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/Redux/Slices/Folders";

interface FoldersProps {
  workspaceId: string;
}

export type FolderData = {
  status: number;
  data: ({
    _count: { videos: number };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workSpaceId: string | null;
  })[];
};

const Folders = ({ workspaceId }: FoldersProps) => {
  const dispatch = useDispatch();
  const { data, isPending, isFetched, refetch, isFetching } = useQueryData(
    ["workspace-folders"],
    () => getWorkspaceFolder(workspaceId)
  );
  const { latestVariables } = useMutationDataState(["create=folder"]);
  const { data: folder, status } = data as FolderData;

  if (isFetched && folder) {
    dispatch(FOLDERS({ folders: folder }));
  }

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
      <section
        className={cn(
          status !== 200 && " flex items-center gap-4  overflow-auto w-full"
        )}
      >
        {status !== 200 ? (
          <p className=" text-neutral-300">No Folders in workspace</p>
        ) : (
          <div className=" flex  gap-4">
            {latestVariables && latestVariables.status === "pending" && (
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
                optimistic
              ></Folder>
            )}

            {folder.map((folder) => (
              <Folder
                name={folder.name}
                count={folder._count.videos}
                id={folder.id}
                key={folder.id}
              ></Folder>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Folders;

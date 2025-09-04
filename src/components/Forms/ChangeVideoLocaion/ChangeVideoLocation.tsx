import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMoveVideos } from "@/hook/useFolders";
import { Loader2 } from "lucide-react";
import React from "react";

type ChangeVideoLocation = {
  videoId: string;
  currentFolder?: string;
  currentFolderName?: string;
  currentworkspace?: string;
};

const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentFolderName,
  currentworkspace,
}: ChangeVideoLocation) => {
  const {
    onFormSubmit,
    errors,
    register,
    isPending,
    folders,
    workspaces,
    isFolders,
    isFetched,
  } = useMoveVideos(videoId, currentworkspace!);

  const folder = folders.find((f) => f.id === currentworkspace);
  const workspace = workspaces.find((f) => f.id === currentworkspace);

  return (
    <form className=" flex flex-col gap-y-5 " onSubmit={onFormSubmit}>
      <div className=" border-[1px] rounded-xl p-5">
        <h2 className=" text-xs text-gray-400">Current Workspace</h2>
        {workspace && <p className=" text-gray-300">{workspace.name}</p>}
        <h2 className=" text-xs text-gray-400">Current Folder</h2>
        {folder ? <p>{folder.name}</p> : "This Video has no Folder"}
      </div>
      <Separator orientation="horizontal"></Separator>
      <div className=" flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className=" text-xs text-gray-300">To</h2>
        <Label className="  flex-col gap-y-2 flex">
          <p className=" text-xs">Workspace</p>
          <select
            {...register("workspace_id")}
            className=" rounded-xl text-base bg-transparent"
          >
            {workspaces.map((space) => (
              <option
                key={space.id}
                className=" text-gray-400"
                value={space.id}
              >
                {space.name}
              </option>
            ))}
          </select>
        </Label>
        {isFetched ? (
          <Skeleton className=" w-full h-[40px]  rounded-xl"></Skeleton>
        ) : (
          <Label className=" flex flex-col gap-y-2 ">
            {isFolders && isFolders.length > 0 ? (
              <select
                className=" rounded-xl bg-transparent text-base"
                {...register("folder_id")}
              >
                {isFolders.map((folder, k) =>
                  k === 0 ? (
                    <option
                      className=" text-gray-400"
                      value={folder.id}
                      key={k}
                    >
                      {folder.name}
                    </option>
                  ) : (
                    <option
                      className=" text-gray-400"
                      key={k}
                      value={folder.id}
                    >
                      {folder.name}
                    </option>
                  )
                )}
              </select>
            ) : (
              <p className=" text-xs">Folders in This workspaces</p>
            )}
          </Label>
        )}
      </div>
      <Button>
        {isPending ? (
          <Loader2 className=" text-gray-500 animate-spin"></Loader2>
        ) : (
          "Transfar"
        )}
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;

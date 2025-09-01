import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMoveVideos } from "@/hook/useFolders";
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
  const {} = useMoveVideos(videoId, currentworkspace!);
  return (
    <form className=" flex flex-col gap-y-5 ">
      <div className=" border-[1px] rounded-xl p-5">
        <h2 className=" text-xs mb-5 text-gray-400">Current</h2>
        <p className=" text-gray-300 ">This video has no folder</p>
      </div>
      <Separator orientation="horizontal"></Separator>
      <div className=" flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className=" text-xs text-gray-300">to</h2>
        <Label className="  flex-col gap-y-2 flex">
          <p className=" text-xs">Workspace</p>
          <select className=" rounded-xl text-base bg-transparent">
            <option className=" text-gray-300" value={"something"}>
              workspace
            </option>
          </select>
        </Label>
      </div>
    </form>
  );
};

export default ChangeVideoLocation;

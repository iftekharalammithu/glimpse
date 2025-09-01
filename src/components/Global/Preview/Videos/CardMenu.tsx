import React from "react";
import Model from "../../Model";
import { Move } from "lucide-react";
import ChangeVideoLocation from "@/components/Forms/ChangeVideoLocaion/ChangeVideoLocation";

type Props = {
  videoId: string;
  currentworkspace?: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const CardMenu = ({
  videoId,
  currentFolder,
  currentFolderName,
  currentworkspace,
}: Props) => {
  return (
    <Model
      className=" flex items-center cursor-pointer gap-x-2"
      title="Move to new Workspace/Folder"
      description="This action cannot be undone . this will permanently delete your account and remove your data from our serveres"
      trigger={<Move size={20} className=" text-gray-400"></Move>}
    >
      <ChangeVideoLocation
        videoId={videoId}
        currentFolder={currentFolder}
        currentFolderName={currentFolderName}
        currentworkspace={currentworkspace}
      ></ChangeVideoLocation>
    </Model>
  );
};

export default CardMenu;

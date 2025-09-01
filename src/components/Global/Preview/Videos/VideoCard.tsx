import { getAllUserVideo } from "@/Actions/Workspace";
import { VideoProps } from "@/types/page";
import { Loader2 } from "lucide-react";
import React from "react";
import CardMenu from "./CardMenu";

// type video = Omit<VideoProps, "status">;
type VideoCardProps = {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  processing: boolean;
  Folder: {
    id: string;
    name: string;
  } | null;
  createAt: Date;
  source: string;
  title: string | null;

  workspaceId: string;
};

const VideoCard = (props: VideoCardProps) => {
  return (
    <div>
      {false ? (
        <Loader2 className=" animate-spin"></Loader2>
      ) : (
        <div className="   cursor-pointer bg-black relative border-[1px] border-black flex flex-col rounded-xl">
          <div className=" absolute top-3 right-3 z-50 flex flex-col\ gap-y-3">
            <CardMenu
              videoId={props.id}
              currentFolder={props.Folder?.id}
              currentFolderName={props.Folder?.name}
              currentworkspace={props.workspaceId}
            ></CardMenu>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;

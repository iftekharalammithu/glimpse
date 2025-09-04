import { getAllUserVideo } from "@/Actions/Workspace";
import { VideoProps } from "@/types/page";
import { CopyleftIcon, Dot, Loader2, Shapes, User } from "lucide-react";
import React from "react";
import CardMenu from "./CardMenu";
import CopyLink from "./CopyLink";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  createdAt: Date;
  source: string;
  title: string | null;

  workspaceId: string;
};

const VideoCard = (props: VideoCardProps) => {
  const daysAgo = Math.floor(
    (new Date().getTime() - props.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );

  return (
    <div>
      {props.processing ? (
        <div className=" flex hover:bg-gray-700 rounded-xl items-center justify-center h-full">
          <Loader2 className="  animate-spin"></Loader2>
        </div>
      ) : (
        <div className="  group overflow-hidden cursor-pointer bg-gray-900 relative border-[1px] border-black flex flex-col rounded-xl">
          <div className=" absolute  group-hover:flex hidden items-center top-3 right-3 z-50  gap-x-3">
            <CardMenu
              videoId={props.id}
              currentFolder={props.Folder?.id}
              currentFolderName={props.Folder?.name}
              currentworkspace={props.workspaceId}
            ></CardMenu>
            <CopyLink
              videoId={props.id}
              className=" p-0 h-5 bg-gray-400 hover:bg-gray-500 "
            ></CopyLink>
          </div>
          <Link
            href={`/preview/${props.id}`}
            className=" hover:bg-gray-700 transition duration-200 flex flex-col justify-between h-full "
          >
            <video
              controls={false}
              preload="metadata"
              className="  w-full aspect-video opacity-50 z-20"
            >
              <source
                src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${props.source}#t=1`}
              ></source>
            </video>
            <div className=" px-5 py-3 flex flex-col  z-20">
              <h2 className=" text-sm  font-semibold capitalize  text-gray-400">
                {props.title}
              </h2>
              <div className=" flex  mt-4 gap-x-2 items-center">
                <Avatar className="  w-8 h-8">
                  <AvatarImage src={props.User?.image as string}></AvatarImage>
                  <AvatarFallback>
                    <User></User>
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className=" capitalize text-gray-400 text-xs">
                    {props.User?.firstname} {props.User?.lastname}
                  </p>
                  <p className=" text-gray-400 flex items-center text-xs">
                    <Dot></Dot> {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
                  </p>
                </div>
              </div>
              <div className=" mt-4 ">
                <span className=" flex  gap-x-1 items-center">
                  <Shapes
                    fill="#909090"
                    className=" text-gray-400 "
                    size={12}
                  ></Shapes>
                  <p className=" text-xs text-gray-400 capitalize">
                    {props.User?.firstname}s Workspace
                  </p>
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default VideoCard;

"use client";
import { getPreviewVideo } from "@/Actions/Workspace";
import { useQueryData } from "@/hook/usequeryData";
import type { VideoTypeProps } from "@/types/page";
import { useRouter } from "next/navigation";
import React from "react";
import CopyLink from "./CopyLink";
import RichLink from "./RichLink";
import { truncateString } from "@/lib/utils";
import { Download } from "lucide-react";
import { Tabs } from "@radix-ui/react-tabs";
import TabsMenu from "../../TabsMenu";

type VideoPreviewProps = {
  videoId: string;
};

const VideoPreview = ({ videoId }: VideoPreviewProps) => {
  const router = useRouter();
  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo(videoId)
  );
  const { data: video, status, author } = data as VideoTypeProps;
  if (status !== 200) {
    router.push("/");
  }

  const dayAgo =
    (new Date().getTime() - video.createdAt.getTime()) / (24 * 60 * 60 * 1000);
  return (
    <div className=" grid grid-cols-1 xl:grid-cols-3 p-10 lg:px-20 lg:py-10 overflow-auto gap-5">
      <div className=" flex flex-col lg:col-span-2 gap-y-10">
        <div>
          <div className=" flex gap-x-5 items-start justify-between">
            <h2 className=" text-white text-4xl font-bold">{video.title}</h2>
            {author ? (
              <EditVideo
                videoId={videoId}
                title={video.title as string}
                description={video.description as string}
              ></EditVideo>
            ) : (
              ""
            )}
          </div>
          <span>
            <p className=" mt-2 text-gray-400 capitalize">
              {video.User?.firstname} {video.User?.lastname}
            </p>
            <p className=" text-gray-400">
              {dayAgo === 0 ? "Today" : `${dayAgo}d ago`}
            </p>
          </span>
        </div>
        <video
          preload="metadata "
          className=" w-full aspect-video opacity-50 rounded-xl"
          controls
        >
          <source
            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video.source}#1`}
          />
        </video>
        <div className=" flex flex-col text-2xl gap-y-4">
          <div className=" flex gap-x-5 items-center justify-between">
            <p className=" text-gray-400 font-semibold">Description</p>
            {author ? (
              <EditVideo
                videoId={videoId}
                title={video.title as string}
                description={video.description as string}
              ></EditVideo>
            ) : (
              ""
            )}
          </div>
          <p className=" text-gray-400 text-lg font-medium">
            {video.description}
          </p>
        </div>
      </div>
      <div className=" lg:col-span-1 flex flex-col gap-y-16">
        <div className=" items-center flex justify-end gap-x-3 ">
          <CopyLink
            variant={"outline"}
            className=" rounded-full bg-transparent px-10"
            videoId={videoId}
          ></CopyLink>
          <RichLink
            description={truncateString(video.description as string, 150)}
            id={videoId}
            source={video.source}
            title={video.title as string}
          ></RichLink>
          <Download className=" text-gray-300"></Download>
        </div>
        <div>
          <TabsMenu
            defaultValue="AI Tools"
            triggers={["AI Tools", "Transcript", "Activity"]}
          >
            <AiTools></AiTools>
          </TabsMenu>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;

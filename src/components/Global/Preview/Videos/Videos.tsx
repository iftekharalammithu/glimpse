"use client";
import { getAllUserVideo } from "@/Actions/Workspace";
import { useQueryData } from "@/hook/usequeryData";
import { cn } from "@/lib/utils";
import { VideoProps } from "@/types/page";
import { FileVideoCamera } from "lucide-react";
import React from "react";
import VideoCard from "./VideoCard";

type VideosProps = {
  folderId: string;
  videoKey: string;
  workspaceId: string;
};

const Videos = ({ folderId, videoKey, workspaceId }: VideosProps) => {
  const { data: videodata } = useQueryData([videoKey], () =>
    getAllUserVideo(folderId)
  );

  const { status: videoStatus, data: video } = videodata as VideoProps;

  return (
    <div className=" flex flex-col gap-4 mt-4">
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-4">
          <FileVideoCamera></FileVideoCamera>
          <h2 className=" text-gray-300 text-xl">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videoStatus !== 200
            ? " p-5"
            : " grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        )}
      >
        {videoStatus === 200 ? (
          video.map((video, i) => (
            <VideoCard
              key={i}
              workspaceId={workspaceId}
              // video={video}
              {...video}
            ></VideoCard>
          ))
        ) : (
          <p className=" text-gray-300 ">No Videos</p>
        )}
      </section>
    </div>
  );
};

export default Videos;

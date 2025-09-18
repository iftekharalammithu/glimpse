import { getWixContent } from "@/Actions/Workspace";
import VideoCard from "@/components/Global/Preview/Videos/VideoCard";
import React from "react";

const page = async () => {
  const video = await getWixContent();
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
      {video.status === 200
        ? video.data?.map((v) => (
            <VideoCard
              key={v.id}
              workspaceId={v.workspaceId}
              {...v}
            ></VideoCard>
          ))
        : "No Video Details Found!"}
    </div>
  );
};

export default page;

import { getUserProfile } from "@/Actions/User";
import { getPreviewVideo } from "@/Actions/Workspace";
import VideoPreview from "@/components/Global/Preview/Videos/VideoPreview";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const page = async (props: { params: { videoId: string } }) => {
  const { videoId } = await props.params;
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["preview-video"],
    queryFn: () => getPreviewVideo(videoId),
  });

  await query.prefetchQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <VideoPreview videoId={videoId}></VideoPreview>
    </HydrationBoundary>
  );
};

export default page;

import { getAllUserVideo, getFolderInfo } from "@/Actions/Workspace";
import FolderInfo from "@/components/Global/Folders/FolderInfo";
import Videos from "@/components/Global/Preview/Videos/Videos";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

type FolderIdProps = {
  params: {
    folderId: string;
    workspaceId: string;
  };
};

const page = async ({ params }: FolderIdProps) => {
  const { folderId, workspaceId } = await params;
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["folder-videos"],
    queryFn: () => getAllUserVideo(folderId),
  });

  await query.prefetchQuery({
    queryKey: ["folder-info"],
    queryFn: () => getFolderInfo(folderId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <FolderInfo folderId={folderId}></FolderInfo>
      <Videos
        folderId={folderId}
        workspaceId={workspaceId}
        videoKey={"folder-videos"}
      ></Videos>
    </HydrationBoundary>
  );
};

export default page;

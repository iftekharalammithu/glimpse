import { getNotification, onAuthenticateUser } from "@/Actions/User";
import {
  getAllUserVideo,
  getWorkscapes,
  getWorkspaceFolder,
  verifyAccessWorkspace,
} from "@/Actions/Workspace";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  params: Promise<{ workspaceId: string }>;
  children: ReactNode;
};

const layout = async ({ params, children }: Props) => {
  const { workspaceId } = await params;

  const auth = await onAuthenticateUser();

  if (!auth.user?.workspace.length) {
    redirect("/auth/sign-in");
  }
  if (!auth.user?.workspace) {
    redirect("/auth/sign-in");
  }

  const hasAccess = await verifyAccessWorkspace(workspaceId);

  if (!hasAccess.data?.workspace) {
    return null;
  }

  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user.workspace[0].id}`);
  }

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolder(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideo(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-workspace"],
    queryFn: () => getWorkscapes(),
  });
  await query.prefetchQuery({
    queryKey: ["user-notification"],
    queryFn: () => getNotification(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className=" flex h-screen w-screen">
        <Sidebar actionWorkspaceId={workspaceId}></Sidebar>

        {children}
      </div>
    </HydrationBoundary>
  );
};

export default layout;

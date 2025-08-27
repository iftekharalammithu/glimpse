import { onAuthenticateUser } from "@/Actions/User";
import { getAllUserVideo, getNotification, getWorkscapes, getWorkspaceFolder, verifyAccessWorkspace } from "@/Actions/Workspace";
import { QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  params: { workspaceId: string };
  children: ReactNode;
};

const layout = async ({ params: { workspaceId }, children }: Props) => {
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

  return <div>{children}</div>;
};

export default layout;

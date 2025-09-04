import { useAppSelector } from "@/Redux/Store";
import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import { getWorkspaceFolder, moveVideoLoacation } from "@/Actions/Workspace";
import useZodForm from "./useZodForm";
import { moveVideoSchema } from "@/components/Forms/ChangeVideoLocaion/Schema";

export const useMoveVideos = (videoId: string, currentWorkspace: string) => {
  const { folders } = useAppSelector((state) => state.Folder);
  const { workspaces } = useAppSelector((state) => state.Workspace);

  const [isFetched, setIsFetching] = useState(false);
  const [isFolders, setIsFolders] = useState<
    | ({
        _count: { videos: number };
      } & {
        id: string;
        name: string;
        createdAt: Date;
        workSpaceId: string | null;
      })[]
    | undefined
  >(undefined);

  const { mutate, isPending } = useMutationData(
    ["change-video-location"],
    (data: { folder_id: string; workspaceId: string }) => {
      moveVideoLoacation(data.folder_id, data.workspaceId, videoId);
    }
  );

  const { watch, register, onFormSubmit, errors } = useZodForm(
    moveVideoSchema,
    mutate,
    { folders_id: null, workSpaceId: currentWorkspace }
  );

  const fetchFolder = async (Workspace: string) => {
    setIsFetching(true);
    const folders = await getWorkspaceFolder(Workspace);
    setIsFetching(false);
    setIsFolders(folders.data);
  };

  useEffect(() => {
    fetchFolder(currentWorkspace);
  }, []);

  useEffect(() => {
    // watch is a function from react-hook-form (used inside useZodForm).

    // It's like setting up a listener or a surveillance camera on your entire form.

    // Every single time any field in the form changes, this callback function is called with the new form values (value).
    const workspace = watch(async (value) => {
      if (value.workSpaceId) {
        fetchFolder(value.workSpaceId);
      }
    });
    return () => workspace.unsubscribe();
  }, [watch]);

  return {
    onFormSubmit,
    errors,
    register,
    isPending,
    folders,
    workspaces,
    isFolders,
    isFetched,
  };
};

import { createFolder } from "@/Actions/Workspace";
import { useMutationData } from "./useMutationData";

export const useCreateFolders = (workspaceId: string) => {
  const { mutate } = useMutationData(
    ["create-folder"],
    () => createFolder(workspaceId),
    "workspace-folders"
  );

  const onCreateNewfolder = () => {
    mutate({ name: "Untitled", id: "optimitsitc-id" });
  };

  return { onCreateNewfolder };
};

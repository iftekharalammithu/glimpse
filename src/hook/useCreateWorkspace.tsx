import { useMutationData } from "./useMutationData";

export const useCreateWorkspace = () => {
  const {} = useMutationData(
    ["CreateWorkspace"],
    (data: { name: string }) => CreateWorkspace(data.name),
    "user-workspace"
  );
};

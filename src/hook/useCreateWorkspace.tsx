import { CreateWorkspace } from "@/Actions/Workspace";
import { useMutationData } from "./useMutationData";
import useZodForm from "./useZodForm";
import { workspaceSchema } from "@/components/Forms/Workspace-form/Schema";

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData(
    ["create-workspace"],
    (data: { name: string }) => CreateWorkspace(data.name),
    "user-workspace"
  );

  const { errors, onFormSubmit, register } = useZodForm(
    workspaceSchema,
    mutate
  );

  return { errors, onFormSubmit, register, isPending };
};

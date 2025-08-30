import FormGenerator from "@/components/Global/FormGenerator";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/hook/useCreateWorkspace";
import { Loader2 } from "lucide-react";
import React from "react";

const WorkspaceForm = () => {
  const { isPending, errors, onFormSubmit, register } = useCreateWorkspace();
  return (
    <form onSubmit={onFormSubmit} className=" flex flex-col gap-y-3">
      <FormGenerator
        name="name"
        placeholder="Workspace Name"
        label="Name"
        errors={errors}
        inputType="input"
        type="text"
        register={register}
      ></FormGenerator>
      <Button
        className=" text-sm w-full mt-2"
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className=" animate-spin"></Loader2>
        ) : (
          "Create Workspace"
        )}
      </Button>
    </form>
  );
};

export default WorkspaceForm;

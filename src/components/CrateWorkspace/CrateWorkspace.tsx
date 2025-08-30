"use client";
import { getWorkscapes } from "@/Actions/Workspace";
import { useQueryData } from "@/hook/usequeryData";
import React from "react";
import Model from "../Global/Model";
import { Button } from "../ui/button";
import { FolderPlusIcon } from "lucide-react";
import WorkspaceForm from "../Forms/Workspace-form/WorkspaceForm";

const CrateWorkspace = () => {
  const { data } = useQueryData(["user-workspace"], getWorkscapes);

  const { data: plan } = data as {
    status: number;
    data: {
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    };
  };
  if (plan.subscription?.plan === "FREE") {
    return (
      <>
        <div>Upgrade to Pro </div>
      </>
    );
  }
  if (plan.subscription?.plan === "PRO") {
    return (
      <Model
        title="Create a Workspace"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        trigger={
          <Button
            variant={"default"}
            className="rounded-2xl  bg-[#1D1D1D] hover:bg-gray-200 hover:text-gray-600 text-gray-200 flex items-center gap-2 py-6 px-4"
          >
            <FolderPlusIcon></FolderPlusIcon> Crate a workspace
          </Button>
        }
      >
        <WorkspaceForm></WorkspaceForm>
      </Model>
    );
  }
};

export default CrateWorkspace;

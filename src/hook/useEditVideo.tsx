import React from "react";
import useZodForm from "./useZodForm";
import { editVideoInfoschema } from "@/components/Forms/EditVideo/Schema";
import { useMutationData } from "./useMutationData";
import { editVideoInfo } from "@/Actions/Workspace";

const useEditVideo = (videoId: string, title: string, description: string) => {
  const { mutate, isPending } = useMutationData(
    ["edit-video"],
    (data: { title: string; description: string }) => {
      editVideoInfo(videoId, data.title, data.description);
    },
    "preview-video"
  );

  const { errors, onFormSubmit, register } = useZodForm(
    editVideoInfoschema,
    mutate,
    { title, description }
  );
  return { errors, isPending, onFormSubmit, register };
};

export default useEditVideo;

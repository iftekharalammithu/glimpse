import FormGenerator from "@/components/Global/FormGenerator";
import useEditVideo from "@/hook/useEditVideo";
import React from "react";

type EditVideoModePRops = {
  videoId: string;
  title: string;
  description: string;
};

const EditVideoMode = ({ videoId, title, description }: EditVideoModePRops) => {
  const { errors, isPending, onFormSubmit, register } = useEditVideo(
    videoId,
    title,
    description
  );
  return (
    <form
      onSubmit={onFormSubmit}
      className=" flex flex-col hy5
  "
    >
      <FormGenerator
        register={register}
        errors={errors}
        name="title"
        inputType="input"
        type="text"
        placeholder="Video Title..."
        label="Title"
      ></FormGenerator>
      <FormGenerator
        register={register}
        errors={errors}
        name="description"
        inputType="textarea"
        type="text"
        lines={5}
        placeholder="Video Title..."
        label="Description"
      ></FormGenerator>
    </form>
  );
};

export default EditVideoMode;
